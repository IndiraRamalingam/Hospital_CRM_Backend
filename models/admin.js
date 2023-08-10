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
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }
})

const Admin=mongoose.model('Admin',adminSchema,'admins');

module.exports = Admin;