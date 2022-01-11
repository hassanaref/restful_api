const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const profileSchema = require('./profile')

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    profile:[{
        type:Schema.Types.ObjectId,
        ref:'profile'
    }]
})

module.exports = mongoose.model('Users', userSchema)