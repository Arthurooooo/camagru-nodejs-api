const config = require("../config/auth.config");
const db = require("../modeles");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "arthur.gonthiersimpsons@gmail.com",
            pass: "csizvnrytgqdfapy"
        }
    });

exports.signup = (req, res) => {
  console.log('we here bitch')
  console.log(req.body)
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    activationCode: Math.floor((Math.random() * 100) + 54)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }


        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          link=req.get('origin')+"/verify?id="+user.activationCode;
          var mailOptions={
              to : req.body.email,
              subject : "Please confirm your Email account",
              html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
          }
          console.log(mailOptions);
          smtpTransport.sendMail(mailOptions, function(error, res){
          if(error)
          {
              console.log(error);
          }
          else
          {
                console.log("Message sent: ");
          }
      });

          res.send({ message: "User was registered successfully!" });
        });

  });
};

exports.signin = (req, res) => {
  let buff = Buffer.from(req.headers.authorization.split(" ")[1], 'base64');
  let plain_auth = buff.toString('ascii');
  var creds = plain_auth.split(':');
  var guest = {
  username: '',
  password: ''
  }
  guest.email = creds[0]
  guest.password = creds[1]
  console.log(creds[1]);
  console.log('searching for ' + guest.email)

  User.findOne({
    email: guest.email
  }, (err, user) => {
    if (!user) {
      return res.status(204).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      guest.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    if(user.active === false) {
      return res.status(401).send({ 
        accessToken: null,
        message: "Confirm your account first"
      })
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      accessToken: token
    });
    return
  })
  .orFail((err) => {
    res.status(401).send({ message: 'user not found' });
    console.log(err)
    return;
  })

};