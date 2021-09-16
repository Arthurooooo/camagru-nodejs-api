var User = require("../modeles/user.model.js");

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

// const GetUserId = (req, res) => {
//         const id = parseInt(req.params.id)
//         res.send(id)
//         let user = users.find(user => user.id === id)
//                 user.username = req.body.username,
//                 user.id = req.body.id,
//                 user.email = req.body.email,
//                 user.password = req.body.password
//         res.status(200).json(user)
// }


module.exports = {
        GetHome,
        GetUserByID,
        GetAllUsers
};
