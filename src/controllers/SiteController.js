const siteController = {
  getHome: (req, res, next) => {
    res.status(200).json({
      message: "welcome to todo list gdsc",
    });
  },
};

module.exports = siteController;
