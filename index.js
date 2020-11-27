const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
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
app.use("/posts/store", validateMiddleWare);
mongoose.connect(
  "mongodb+srv://urlshortener1234:urlshortener1234@cluster0.bef07.mongodb.net/my_database",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", homeController);
app.get("/post/:id", getPostController);
app.get("/posts/new", newPostController);
app.post("/posts/store", storePostController);
app.get("/auth/register", newUserController);
app.post("/users/register", storeUserController);
app.get("/auth/login", loginController);
app.post("/users/login", loginUserController);

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
