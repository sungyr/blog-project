const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const fileUpload = require("express-fileupload");
const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const getPostController = require("./controllers/getPost");
const storePostController = require("./controllers/storePost");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const validateMiddleWare = require("./middleware/validationMiddleWare");
const authMiddleWare = require("./middleware/authMiddleWare");
const redirectIfAuthenticatedMiddleWare = require("./middleware/redirectIfAuthenticatedMiddleWare");
const expressSession = require("express-session");
const logoutController = require("./controllers/logOut");
mongoose.connect(
  "mongodb+srv://sung3927:sung0805@cluster0.dttf9.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
global.loggedIn = null;

app.use(fileUpload());
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/posts/store", validateMiddleWare);
app.use(
  expressSession({
    secret: "keyboard cat",
  })
);

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});
app.get("/", homeController);
app.get("/post/:id", getPostController);
app.get("/posts/new", authMiddleWare, newPostController);
app.post("/posts/store", authMiddleWare, storePostController);
app.get("/auth/register", redirectIfAuthenticatedMiddleWare, newUserController);
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleWare,
  storeUserController
);
app.get("/auth/login", redirectIfAuthenticatedMiddleWare, loginController);
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleWare,
  loginUserController
);
app.get("/auth/logout", logoutController);
app.use((req, res) => res.render("notfound"));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
