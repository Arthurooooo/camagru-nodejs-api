const mongoose = require("mongoose");

const schema = new mongoose.Schema(  {
    path     : { type: String, required: true },
    date      : { type: Date, required: true, trim: true, index: true },
    author  : { type: String, required: true }
  })

  module.exports = mongoose.model("Content", schema);;