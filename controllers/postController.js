const BlogPost = require("../models/blogPost.js");
const path = require("path");

const newPost = (req, res) => {
  if (req.session.userId) {
    return res.render("create", {
      createPost: true,
    });
  }
  res.redirect("/");
};

const storePost = (req, res) => {
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

const getPost = async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id).populate("userid");
  console.log(blogpost);
  res.render("post", { blogpost: blogpost });
};

module.exports = { newPost, storePost, getPost };
