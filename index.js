const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3080;
const users = require('./users.json');
const dbConfig = require("./config/db.config");
const fileUpload = require('express-fileupload');

var corsOptions = {
  origin: "http://localhost:8081",
  credentials: true

};

app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, '../my-app/build')));
app.use(express.static('assets'));
app.use(express.json())

const db = require("./modeles");
const Role = db.role;

app.use(fileUpload({
  createParentPath: true
}));

require("./routes/routes.js")(app);

app.put('/api/users/:id', (req,res) => {
  const id = parseInt(req.params.id)
  let user = users.find(user => user.id === id)
  user.username =req.body.username,
  user.email =req.body.email,
  user.password =req.body.password,
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
