const User = require("../models/user.js");

const storeUser = (req, res) => {
  User.create(req.body, (error) => {
    if (error) {
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      req.flash("validationErrors", validationErrors);
      req.flash("data", req.body);
      return res.redirect("/auth/register");
    }
    res.redirect("/");
  });
};

const newUser = (req, res) => {
  var username = "";
  var password = "";
  const data = req.flash("data")[0];

  if (typeof data != "undefined") {
    username = data.username;
    password = data.password;
  }

  res.render("register", {
    errors: req.flash("validationErrors"),
    username: username,
    password: password,
  });
};

module.exports = { storeUser, newUser };
