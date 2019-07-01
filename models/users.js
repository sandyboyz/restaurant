const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    role : {
        type: String,
        required: true,
    },
    workerID: {
        type: Number,
        required: function(){
            return this.role==="Worker";
        }
    },
    password : {
        type: String,
        required: true
    }
});



module.exports = mongoose.model('Users', Users);