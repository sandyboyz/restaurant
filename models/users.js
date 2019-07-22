const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Counter = require("./counter");

const Users = new Schema({
  role: {
    type: String,
    required: true
  },
  workerID: {
    type: String,
    required: function() {
      return this.role === "worker";
    }
  },
  workerName: {
    type: String,
    required: function() {
      return this.role === "worker";
    },
    minLength: 3
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Users", Users);
