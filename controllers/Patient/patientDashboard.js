const Patient=require('../../models/patient');
const Doctor=require('../../models/doctor');
const jwt = require("jsonwebtoken");
const config=require('../../utils/config');
const { request } = require('express');

const SECRET_KEY_PATIENT=config.SECRET_KEY_PATIENT;

const getTokenFrom = (request) => {
    const authHeader = request.header('Authorization');
    return authHeader;
}

const patientDashboard={
    getPatient:async(req,res) =>{
        try{
            const token = getTokenFrom(req);
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_PATIENT);
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
            }
            const patient=await Patient.findById(decodedToken.patientId).exec();
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
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_PATIENT);
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
            }
            const patient=await Patient.findById(req.params.id).exec();
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

            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_PATIENT);

            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
            }
            const{doctorname,date,time}=req.body; 
            const doctname=doctorname
            var doctor=await Doctor.findOne({name:{$eq:doctorname}});
              
           const patient=await Patient.findByIdAndUpdate(req.params.id).exec();            
           patient.doctorname=patient.doctorname.concat(doctorname)
           patient.date=patient.date.concat(date)
           patient.time=patient.time.concat(time)
           patient.doctor=patient.doctor.concat(doctor._id)
           const result=await patient.save();
        
            doctor.patient=doctor.patient.concat(result._id)
            await doctor.save();
  
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
