const mongoose=require('mongoose');
const patientSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    age:{
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
    address:{
        type:String,
    },
    phone:{
        type:String,
    },
    appointment:{
        type:Date,
    },
    doctor_name:{
        type:String,
    },
    prescription:{
        type:String,
    },
    disease:{
        type:String,
    },
    doctor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }],
})

const Patient=mongoose.model('Patient',patientSchema,'patients');

module.exports = Patient;