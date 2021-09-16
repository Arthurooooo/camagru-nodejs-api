const mongoose = require("mongoose");

const schema = new mongoose.Schema(  {
    username     : { type: String, required: true },
    email      : { type: String, required: true, trim: true, index: true },
    password  : { type: String, required: true },
    active  : { type: Boolean, default: false  }, 
    activationCode : { type: String  }
  })

module.exports = mongoose.model("User", schema);;