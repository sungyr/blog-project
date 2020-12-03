const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const fileUpload = require("express-fileupload");
const homeController = require("./controllers/home");
const logInController = require("./controllers/loginController");
const postController = require("./controllers/postController");
const registerController = require("./controllers/registerController");
const validateMiddleWare = require("./middleware/validationMiddleWare");
const authMiddleWare = require("./middleware/authMiddleWare");
const redirectIfAuthenticatedMiddleWare = require("./middleware/redirectIfAuthenticatedMiddleWare");
const expressSession = require("express-session");

mongoose.connect(
  "mongodb+srv://sung3927:sung0805@cluster0.dttf9.mongodb.net/test",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
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
// app.use("/posts/store", validateMiddleWare);
app.use(
  expressSession({
    secret: "keyboard cat",
  })
);

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});
app.get("/", homeController.mainPage);
app.get("/:page", homeController.mainPage);

app.get("/post/:id", postController.getPost);
app.get("/posts/new", authMiddleWare, postController.newPost);
app.post("/posts/store", authMiddleWare, postController.storePost);
app.get(
  "/auth/register",
  redirectIfAuthenticatedMiddleWare,
  registerController.newUser
);
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleWare,
  registerController.storeUser
);
app.get(
  "/auth/login",
  redirectIfAuthenticatedMiddleWare,
  logInController.logIn
);
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleWare,
  logInController.logInUser
);
app.get("/auth/logout", logInController.logOut);
app.use((req, res) => res.render("notfound"));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
