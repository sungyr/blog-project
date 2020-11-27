const BlogPost = require("../models/blogPost");

module.exports = async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  console.log(blogpost);
  res.render("post", { blogpost: blogpost });
};
