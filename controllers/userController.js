
var arthur = {
        name: "arthur",
        city: "Paris",
        UserID: "1",
        email: "argonthi@student.42.fr"
}

var User = require("../modeles/user.model.js");

const GetHome = (req, res) => {
        res.send("welcome to my API, this is a response.");
}
const GetUser = (req, res) => {
        console.log('api/users called!')
        User.find({ UserID: 1 }, (err, docs) => {
                console.log(docs)
                if (!err) res.send(docs);
                else console.log("error User not found");
        })
}
const postUser = (req, res) => {
         console.log(req.body)
         res.send(req.body);
         const newuser = new User({
                name: req.body.name,
                city: req.body.city,
                userID: req.body.UserID,
                email: req.body.email
        }).then(newuser => {
                newuser.save((err, docs) => {
                        return res.status(201).json("user added")
                })
        })
}
const GetUserId = (req, res) => {
        const id = parseInt(req.params.id)
        res.send(id)
        let user = users.find(user => user.id === id)
        user.name = req.body.name,
                user.city = req.body.city,
                user.id = req.body.id,
                user.email = req.body.email
        res.status(200).json(user)
}


module.exports = {
        GetHome,
        GetUser,
        postUser,
        GetUserId
};
