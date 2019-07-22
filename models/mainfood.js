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

const mainfood = mongoose.model('MainFood', MainFood);
const backup_mainfood = mongoose.model('Backup_MainFood', MainFood);



// const mongoose2 = require("mongoose");
// const Schema2 = mongoose2.Schema;

// const MainFood2 = new Schema2({

// });

module.exports = {MainFood: mainfood, backup_mainfood};

