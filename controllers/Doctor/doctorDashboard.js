const Patient=require('../../models/patient');
const Doctor=require('../../models/doctor');
const jwt = require("jsonwebtoken");
const config=require('../../utils/config');
const { request } = require('express');

const SECRET_KEY_DOCTOR=config.SECRET_KEY_DOCTOR;

const getTokenFrom = (request) => {
    const authHeader = request.header('Authorization');
    //const authHeader = request.get('Authorization');
    return authHeader;
}

const doctorDashboard={
    viewPatients:async(req,res)=>{
        try{
            const token = getTokenFrom(req);
            console.log("TOOKE  __ > "+token)
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_DOCTOR);
            console.log("DECODED_NEW  --> "+decodedToken.doctorId)
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
                console.log("INVALID TOKEN")
            }

            //const patientList=await Doctor.findById(decodedToken.doctorId).exec();
            const patientList=await Patient.find().exec();
            console.log("PatientDetails --- >"+patientList)
            const patientss=patientList
            res.status(200).json({patientss})

        }
        catch(error)
        {
            console.error('Error in Fetching Appoinment Details',error)
            res.status(500).json({message:'Appointment List Fetching ERROR for Doctor'})
        }
    },
    prescribeMedicine:async(req,res) =>{
        try{
        const token = getTokenFrom(req);
            console.log("TOOKE  __ > "+token)
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_DOCTOR);
            console.log("DECODED_NEW  --> "+decodedToken.doctorId)
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
                console.log("INVALID TOKEN")
            }

            //const patientList=await Doctor.findById(decodedToken.doctorId).exec();
            const prescribe=await Patient.findById(req.params.id).exec();
            prescribe.set(req.body);
            const result=await prescribe.save();
            res.status(200).json({result})

        }
        catch(error)
        {
            console.error('Error in prescribe medicine',error)
            res.status(500).json({message:'Error in prescribe medicine'})
        }
    }
}

module.exports=doctorDashboard;