const mongoose = require("mongoose");

const schema = new mongoose.Schema(  {
    username     : { type: String, required: true },
    email      : { type: String, required: true, trim: true, index: true },
    password  : { type: String, required: true }
  })

module.exports = mongoose.model("User", schema);;