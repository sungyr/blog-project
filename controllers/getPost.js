const BlogPost = require("../models/blogPost");

module.exports = async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id).populate("userid");
  console.log(blogpost);
  res.render("post", { blogpost: blogpost });
};
