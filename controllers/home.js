const BlogPost = require("../models/blogPost");
const escapeRegex = require("../regex-escape");

const mainPage = async (req, res) => {
  const resPerPage = 3;
  const page = req.params.page || 1;
  const numOfProducts = await BlogPost.count({});
  const blogposts = await BlogPost.find({})
    .populate("userid")
    .skip(resPerPage * page - resPerPage)
    .limit(resPerPage);

  res.render("index", {
    blogposts: blogposts,
    currentPage: page,
    pages: Math.ceil(numOfProducts / resPerPage),
    numOfResults: numOfProducts,
  });
};

module.exports = { mainPage };
