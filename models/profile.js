const mongoose = require('mongoose');
const Schema = mongoose.Schema
const profileSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('profile',profileSchema);