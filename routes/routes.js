module.exports = (app) => {

const fs = require('fs');
const path = require('path');
var Post = require("../modeles/post.model.js");
const multer = require('../middlewares/multer-config');
const db = require("../modeles");
const User = db.user;


    const userController = require("../controllers/user.controller.js");
    const verifySignUp = require("../middlewares/verifySignUp.js");
    const authcontroller = require("../controllers/auth.controller.js");
    const postController = require("../controllers/post.controller.js");

    app.get("/api/", userController.GetHome);
    app.get("/api/users", userController.GetAllUsers);
    //app.post("/api/signup", userController.postUser);
    //app.post("/api/signin", userController.postUser);
    app.put("/api/users/:id", userController.GetUserByID);

    app.get('/', (req,res) => {
        console.log(req.body)
        res.sendFile(path.join(__dirname, './assets/index.html'));
      });

      app.post("/api/signup",
          [
            verifySignUp.checkDuplicateUsernameOrEmail,
            //authcontroller.signup
          ],
        );

      app.post("/api/login", authcontroller.signin);

      app.get('/api/verify',(req,res) => {
        console.log('here' + req.body.id)
        User.findOneAndUpdate({ activationCode:req.query.id },{active: true},
        (err, user) => {
          console.log("Result : ", user);
          return res.status(200).send()
          })
          }
        )

      app.get('/api/getuserlastposts', (req, res) => {
        postController.GetUserLastPosts(req, res)
      })

      app.post('/api/deletepost', (req, res) => {
        postController.DeletePost(req, res)
      })

      app.post('/api/upload-image', (req, res) => {
      console.log('Uploading image')
      //console.log(req.body)
      postController.SavePost(req, res);
      }
      )

}
