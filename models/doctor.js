const mongoose=require('mongoose');
const doctorSchema = new mongoose.Schema({
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
    specialist:{
        type:String,
    },
    fee:{
        type:String,
    },
    patient:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }],
})

const Doctor=mongoose.model('Doctor',doctorSchema,'doctors');

module.exports = Doctor;