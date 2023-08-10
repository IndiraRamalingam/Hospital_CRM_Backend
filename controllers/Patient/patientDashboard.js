const Patient=require('../../models/patient');
const Doctor=require('../../models/doctor');
const jwt = require("jsonwebtoken");
const config=require('../../utils/config');
const { request } = require('express');

const SECRET_KEY_PATIENT=config.SECRET_KEY_PATIENT;

const getTokenFrom = (request) => {
    const authHeader = request.header('Authorization');
    //const authHeader = request.get('Authorization');
    return authHeader;
}

const patientDashboard={
    getPatient:async(req,res) =>{
        try{
            const token = getTokenFrom(req);
            console.log("TOOKE  __ > "+token)
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_PATIENT);
            console.log("DECODED_NEW  --> "+decodedToken.patientId)
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
                console.log("INVALID TOKEN")
            }
            const patient=await Patient.findById(decodedToken.patientId).exec();
            console.log("PatientDetails --- >"+patient)
            res.status(200).json({patient})
            
        }
        catch(error){
            console.error('Error in Fetching Patient Details',error)
            res.status(500).json({message:'Patient Fetching ERROR'})
        }
    },
    bookAppointment:async(req,res)=>{
        try{
            const token = getTokenFrom(req);
            console.log("TOKEN  __ > "+token)
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_PATIENT);
            console.log("DECODED_NEW  --> "+decodedToken.patientId)
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
                console.log("INVALID TOKEN")
            }
            const doctorList=await Doctor.find().populate('name').exec();
            console.log(doctorList)
            const{appointment,doctor_name}=req.body;
            const patient=await Patient.findByIdAndUpdate(decodedToken.patientId).exec();
            
            patient.set({appointment,doctor_name})
            const result=await patient.save();
            console.log(result)
            res.status(200).json({result})
        }
        catch(error)
        {
            console.error('Error in booking appointment',error)
            res.status(500).json({message:'Patient Appointment Booking ERROR'})
        }
    }
    

}

module.exports = patientDashboard
