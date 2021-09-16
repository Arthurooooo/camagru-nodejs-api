var Post = require("../modeles/post.model.js");
var multer = require('multer');
var upload = multer({dest:'uploads/'});

const   imgToFile = (req, res) => {
    let base64String = req.body.img;
    console.log(req.body)

}

const GetUserLastPosts = (req, res) => {
    console.log('api/post called!')
    console.log(req.query.author)
    Post.find({ author : req.query.author }, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
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
    var postData = req.body
    var post = new Post({
        author: postData.author,
        date:   postData.date,
        text:   postData.text,
        isPublic: postData.isPublic,
        img:    postData.img
    });
    console.log("here")
    post.save()
    .then(result => {
        res.status(201)
        .json({
            message: "Post saved successfully!",
        })
        res.send()
    })
}

const DeletePost = (req, res) => {

    Post.findOneAndDelete({ _id : req.body.params.postID }, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            console.log('post removed')
            console.log(req.body.params.postID)
            res.send()
        }
    })

}

module.exports = {
    GetUserLastPosts, SavePost, DeletePost
};