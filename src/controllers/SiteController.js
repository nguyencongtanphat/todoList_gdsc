const siteController = {
  getHome: (req, res, next) => {
    if (req.body.userId) {
      res.status(200).json({
        message: "now you can see and post your own post",
      });
    } else {
      res.status(200).json({
        message:
          "welcome to todo list gdsc and you need to login or signup to see and post your own todolist",
      });
    }
  },
};

module.exports = siteController;
