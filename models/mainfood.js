const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const MainFood = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    picture:{
        type: String,
        default: "uploads/default.png",
        required: true
    }
});
MainFood.plugin(mongoosePaginate);
module.exports = mongoose.model('MainFood', MainFood);