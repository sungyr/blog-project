const bcrypt = require("bcrypt");
const User = require("../models/user");

const logIn = (req, res) => {
  res.render("login");
};

const logInUser = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          res.redirect("/");
        } else {
          res.redirect("/auth/login");
        }
      });
    } else {
      res.redirect("/auth/login");
    }
  });
};

const logOut = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports = { logIn, logInUser, logOut };
