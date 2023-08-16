const mongoose=require('mongoose');
const patientSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    age:{
        type:String,
    },
    gender:{
        type:String
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
    prescription:[{
        type:String,
    }],
    disease:[{
        type:String,
    }],
    specialist:[{
        type:String,
    }],
    time:[{
        type:String,
    }],
    date:[{
        type:Date,
    }],

    doctor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }],
})

const Patient=mongoose.model('Patient',patientSchema,'patients');

module.exports = Patient;