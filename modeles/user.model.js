const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/camagruAPI')



var User = mongoose.model(
  "User",
  {
    name     : { type: String, required: true },
    city  : { type: String, required: true },
    UserID : { type: String, required: true},
    email      : { type: String, required: true, trim: true, index: { unique: true, sparse: true } },
  },
  "users"
);

module.exports = { User };