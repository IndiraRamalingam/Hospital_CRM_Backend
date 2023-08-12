const mongoose=require('mongoose');
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    message:{
        type:String,
    }
})

const Contact=mongoose.model('Contact',contactSchema,'contacts');

module.exports = Contact;