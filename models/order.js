const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const date = require("date-and-time");

date.locale("id");

const Order = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  order: {
    type: [
      {
        _id: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  utc: {
    type: Date,
    default: Date.now,
    select: false
  },
  orderDate: {
    type: String,
    default: function() {
      return date.format(this.utc, "dddd, DD MMMM YYYY");
    }
  },
  orderTime: {
    type: String,
    default: function() {
      return date.format(this.utc, "HH:mm:ss [GMT]Z");
    }
  }
});

module.exports = mongoose.model("Order", Order);
