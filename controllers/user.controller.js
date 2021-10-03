var User = require("../modeles/user.model.js");
var Token = require("../modeles/token.model.js");
var nodemailer = require('nodemailer');
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const bcryptSalt = process.env.BCRYPT_SALT;


var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: "arthur.gonthiersimpsons@gmail.com",
        pass: "csizvnrytgqdfapy"
}});

const GetHome = (req, res) => {
        res.send("welcome to my API, this is a response.");
}

const GetAllUsers = (req, res) => {
        User.find({}, (err, docs) => {
                if (!err) res.send(docs);
                else console.log("error cant get all users");
                return;
        })
}
const GetUserByID = (req, res) => {
        console.log('api/users called!')
        User.find({ UserID: req.UserID }, (err, docs) => {
                //console.log(docs)
                if (!err) res.send(docs);
                else console.log("error User not found");
        })
}

const PasswordReset = (req, res) => {
        console.log(req.body.email)
        User.findOne({ email: req.body.email }, (err, docs) =>{}).exec((err, user) => {
                if (user == null){
                        res.error = "User not found"
                        res.status(401).send();
                        return
                }
                else{
                        let token = Token.findOne({ userID: user._id }).exec((err, token) =>{
                                if (token){
                                        console.log(token)
                                        token.remove();
                                }
                                else console.log("no token found")
                        })
                        let resetToken = crypto.randomBytes(32).toString("hex");

                        new Token({
                        userID: user._id,
                        token: bcrypt.hashSync(resetToken, Number(bcryptSalt)),
                        createdAt: Date.now(),
                        }).save((err, token) => {
                                if(err){
                                        console.log(err)
                                        res.status(500).send()
                                }
                        });

                        const link = `${req.get('origin')}/newpassword?token=${resetToken}&userID=${user._id}`;
                        var mailOptions={
                                to : user.email,
                                subject : "Reset your password",
                                html : "Hello,<br> Please Click on the link to reset your password.<br><a href="+link+">Click here to reset</a>" 
                            }
                            smtpTransport.sendMail(mailOptions, function(error, res){
                            if(error)
                            {
                                console.log(error);
                            }
                            else
                            {
                                console.log("Message sent!");
                                }
                        })
                        res.send(user);
                        return
                }
        })
}

const NewPassword = (req, res) => {
        console.log(req.body);
        Token.findOne({userID:req.body.userID}).exec((err, token) => {
                if (token == null){
                        res.status(401).send()
                        console.log(req.body.userID)
                        console.log(req.body.token)
                        return
                }
                else{
                        console.log(token.token)
                        console.log(req.body.token)
                const isValid = bcrypt.compareSync(req.body.token, token.token);
                if (!isValid) {
                        throw new Error("Invalid or expired password reset token");
                      }
                const hash = bcrypt.hashSync(req.body.password, Number(bcryptSalt));
                        console.log('here')
                        console.log(token.userID)
                User.findOneAndUpdate({_id:token.userID}, {password:hash})
                .then((user) => {
                        console.log("found user" + user)
                })
                .catch((err) => {
                        console.log("error" + err)
                })
                res.status(200).send()
        }
        })
}



module.exports = {
        GetHome,
        GetUserByID,
        GetAllUsers,
        PasswordReset,
        NewPassword,
};
