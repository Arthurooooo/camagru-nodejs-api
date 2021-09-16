const db = require("../modeles");
const ROLES = db.ROLES;
const User = db.user;
const authController = require("../controllers/auth.controller.js");


checkDuplicateUsernameOrEmail = async (req, res) => {
  //console.log('checking')
  // Username
  await User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      console.log("username already in use")
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
  });
    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        console.log("email already in use")

        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      authController.signup(req, res)
    });

};

// checkRolesExisted = (req, res, next) => {
//   if (req.body.roles) {
//     for (let i = 0; i < req.body.roles.length; i++) {
//       if (!ROLES.includes(req.body.roles[i])) {
//         res.status(400).send({
//           message: `Failed! Role ${req.body.roles[i]} does not exist!`
//         });
//         return;
//       }
//     }
//   }

//   next();
// };

const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;