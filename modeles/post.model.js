const mongoose = require("mongoose");

const schema = new mongoose.Schema(  {
    date      : { type: Date, required: true, trim: true, index: true },
    author  : { type: String, required: true },
    img :    { type: String, required: true },
    text: { type: String, required: true},
    isPublic: { type: Boolean, required: true }
  })

  module.exports = mongoose.model("Post", schema);