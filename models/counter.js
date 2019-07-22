const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  id: { type: String, required: true, unique: true },
  seq: { type: Number, default: 1 }
});

const Counter = mongoose.model("Counter", CounterSchema);

const createCounter = function(id) {
  return Counter.find({ id })
    .then(res => {
      if (res.length === 0) {
        Counter.create({ id });
      }
    })
    .catch(e => console.log(e));
};


createCounter("Users");

module.exports = { Counter, createCounter };
