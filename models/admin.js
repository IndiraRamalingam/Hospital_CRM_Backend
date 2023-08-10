const mongoose=require('mongoose');
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const Admin=mongoose.model('Admin',adminSchema,'admins');

module.exports = Admin;