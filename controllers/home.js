const BlogPost = require("../models/blogPost");

module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({}).populate("userid");

  res.render("index", { blogposts: blogposts });
};
