module.exports.home = function (req, res) {
  return res.redirect("home", {
    title: "CSV Upload | Home",
  });
};
