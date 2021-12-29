const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
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
module.exports =  mongoose.model('Users', userSchema)