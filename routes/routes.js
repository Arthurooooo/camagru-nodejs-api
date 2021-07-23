module.exports = (app) => {
    const userController = require("../controllers/userController.js");
    const verifySignUp = require("../middlewares/verifySignUp.js");
    const authcontroller = require("../controllers/auth.controller.js");


    app.get("/", userController.GetHome);
    app.get("/api/users", userController.GetAllUsers);
    //app.post("/api/signup", userController.postUser);
    //app.post("/api/signin", userController.postUser);
    app.put("/api/users/:id", userController.GetUserByID);

    app.get('/', (req,res) => {
        console.log(req.body)
        res.sendFile(path.join(__dirname, './assets/index.html'));
      });

      app.post(
        "/api/signup",
        [
          verifySignUp.checkDuplicateUsernameOrEmail,
          //verifySignUp.checkRolesExisted
        ],
        authcontroller.signup
      );
    
      app.post("/api/signin", authcontroller.signin);
    //   app.get('/assets/photo1.jpg', (req, res) => {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     console.log('api/users called!')
    //     res.sendFile(path.join(__dirname,'./assets/photo1.jpg'));
    //   });
}