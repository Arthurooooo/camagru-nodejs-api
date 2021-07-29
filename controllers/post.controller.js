var Post = require("../modeles/post.model.js");
var multer = require('multer');
var upload = multer({dest:'uploads/'});

const   imgToFile = (req, res) => {
    let base64String = req.body.img;
    console.log(req.body)

}

const GetPost = (req, res) => {
    console.log('api/post called!')
    Post.find({ author: 'jojo'}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            //console.log(items[0]);
            var postData = {
                'date' : items.date,
                'author' : items.author,
                'img' : items.img
            }
            //console.log(postData);
            res.postData = postData
            res.status(200).json(items);
            //res.render('imagesPage', { items: items });
        }
    });

}

const SavePost = (req, res) => {
    // console.log(req.body)
    postData = req.body.postData
    //console.log(req.body.postData.author)
    var post = new Post({
        date: Date.now(),
        author: postData.author,
        img:    postData.img
    });
    post.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
        })
    })
}

module.exports = {
    GetPost, SavePost, imgToFile
};