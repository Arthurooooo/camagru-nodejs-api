const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    userID: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600,// this is the expiry time in seconds
    },
  });
  module.exports = mongoose.model("Token", tokenSchema);