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
//     bookAppointment:async(req,res)=>{
//         try{
//             const token = getTokenFrom(req);
//             console.log("TOKEN  __ > "+token)
// 
//             // decode the token to authorize the user
//             const decodedToken = jwt.verify(token, SECRET_KEY_PATIENT);
//             console.log("DECODED_NEW  --> "+decodedToken.patientId)
// 
//             // if the token is not valid, return an error
//             if(!decodedToken){
//                 return response.json({ message: 'token invalid' });
//                 console.log("INVALID TOKEN")
//             }
//             
//             const doctorList=await Doctor.find({},{name:1}).exec();
//             console.log("DoctorList --- >  "  +doctorList)
//             const{appointment,doctor_name,doctor}=req.body;
//             console.log("doctor_name --> "+ doctor_name +"   "+doctor)
//             const patient=await Patient.findByIdAndUpdate(decodedToken.patientId).exec();            
//             patient.set(req.body)
//             const result=await patient.save();
// 
//             // patient.doctor = d_id;
//             // await patient.save();
//             // res.send(student);
//                                                         
//             console.log(result)
//             res.status(200).json({result})
//         }
//         catch(error)
//         {
//             console.error('Error in booking appointment',error)
//             res.status(500).json({message:'Patient Appointment Booking ERROR'})
//         }
//     }
//     //64d397f385314614e6450658
    

}

module.exports = patientDashboard
