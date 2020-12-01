const BlogPost = require("../models/blogPost.js");
const path = require("path");

module.exports = (req, res) => {
  if (req.files != null) {
    let image = req.files.image;
    image.mv(
      path.resolve(__dirname, "..", "public/img", image.name),
      async (error) => {
        await BlogPost.create({
          ...req.body,
          image: "/img/" + image.name,
          userid: req.session.userId,
        });
        res.redirect("/");
      }
    );
  } else if (req.files == null) {
    BlogPost.create({
      ...req.body,
      image: "none",
      userid: req.session.userId,
    });
    res.redirect("/");
  } else res.redirect("/");
};
