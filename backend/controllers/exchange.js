const Exchange = require("../models/exchange");

exports.getPosts = (req, res, next) => {
  const postQuery = Exchange.find();
  let fetchedPosts;
  postQuery
    .then((documents) => {
      fetchedPosts = documents;
      return Exchange.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Exchange fetched successfully",
        posts: fetchedPosts,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Exchange posts failed!",
      });
    });
};
