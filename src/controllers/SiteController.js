const siteController = {
  getHome: (req, res, next) => {
    console.log("2");
    if (req.id) {
      res.json({
        message: "you can see and post todo list at",
        link: "http://localhost:3000/todos",
      });
    } else {
      res.status(200).json({
        message: "you need to login or sign up to write and see your todolist",
        signUp: "http://localhost:3000/user/signup",
        logIn: "http://localhost:3000/user/login",
      });
    }
  },
};

module.exports = siteController;
