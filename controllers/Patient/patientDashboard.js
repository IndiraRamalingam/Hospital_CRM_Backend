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
            console.log("PatientDetails ID --- >"+patient._id)
            const patient_ID=patient._id
            res.status(200).json({patient_ID})
            
        }
        catch(error){
            console.error('Error in Fetching Patient ID',error)
            res.status(500).json({message:'Error in Fetching Patient ID'})
        }
    },

    getPatientByID:async(req,res) =>{
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
            const patient=await Patient.findById(req.params.id).exec();
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
            const{doctorname,date,time}=req.body; 
            const doctname=doctorname
            console.log("DOCTOR ---> "+doctname)
            var doctor=await Doctor.findOne({name:{$eq:doctorname}});
              

           const patient=await Patient.findByIdAndUpdate(req.params.id).exec();            
           patient.doctorname=patient.doctorname.concat(doctorname)
           patient.date=patient.date.concat(date)
           patient.time=patient.time.concat(time)
            patient.doctor=patient.doctor.concat(doctor._id)
           const result=await patient.save();
        
            doctor.patient=doctor.patient.concat(result._id)
            await doctor.save();
            
                                                        
            console.log(result)
            console.log("BOOKING SUCESS")
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
