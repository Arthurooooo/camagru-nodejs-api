const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
//const bodyParser = require("body-parser");
const port = 3080;
const users = require('./users.json');


var arthur = {
  name: "arthur",
  city: "Paris",
  UserID: "1",
  email: "argonthi@student.42.fr"
}

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../my-app/build')));
app.use(express.static('/assets/'));
app.use(express.json())

require("./routes/routes.js")(app);

app.get('/', (req,res) => {
  console.log(req.body)
  res.sendFile(path.join(__dirname, './assets/index.html'));
});


app.get('/assets/photo1.jpg', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log('api/users called!')
  res.sendFile(path.join(__dirname,'./assets/photo1.jpg'));
});

// app.get('/api/users/:id', (req,res) => {
//   const id = parseInt(req.params.id)
//   const user = users.find(user => user.id === id)
//   res.status(200).json(user)
// })

// app.post('/api/users', (req,res) => {
//   users.push(req.body)
//   res.status(200).json(users)
// })

app.put('/api/users/:id', (req,res) => {
  const id = parseInt(req.params.id)
  let user = users.find(user => user.id === id)
  user.name =req.body.name,
  user.city =req.body.city,
  user.id =req.body.id,
  user.email =req.body.email
  res.status(200).json(user)
})

app.delete('/api/users/:id', (req,res) => {
  const id = parseInt(req.params.id)
  let user = users.find(user => user.id === id)
  users.splice(users.indexOf(user),1)
  res.status(200).json(users)
})

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});