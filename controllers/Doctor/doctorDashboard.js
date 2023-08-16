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

    //getDoctorID

    getDoctorID:async(req,res) =>{
        try{
            const token = getTokenFrom(req);
            console.log("TOOKE  __ > "+token)
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_DOCTOR);
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
                console.log("INVALID TOKEN")
            }
            const doctor=await Doctor.findById(decodedToken.doctorId).exec();
            
            const doctor_ID=doctor._id
            const name=doctor.name
            res.status(200).json({doctor_ID,name})
            
        }
        catch(error){
            console.error('Error in Fetching Doctor ID',error)
            res.status(500).json({message:'Error in Fetching Doctor ID'})
        }
    },


    //View all patients
    viewPatients:async(req,res)=>{
        try{
            const token = getTokenFrom(req);
            console.log("TOOKE  __ > "+token)
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_DOCTOR);
            //console.log("DECODED_NEW  --> "+decodedToken.doctorId)
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
                console.log("INVALID TOKEN")
            }

            const doc=await Doctor.findById(decodedToken.doctorId).exec();
            const docId=doc.id
            console.log("DDD   "+docId)

            //const patientList=await Patient.find().exec();
            const patientList=await Patient.find().exec();
            patientList.map((m)=>{
                console.log("MMM   "+m.doctor)
            })
            const result=await Patient.find({doctor:{$eq:docId}}).exec();
            console.log("RESULT   "+result)
            //console.log("PatientDetails --- >"+patientList)
            const patients=result
            res.status(200).json({patients})

        }
        catch(error)
        {
            console.error('Error in Fetching Appoinment Details',error)
            res.status(500).json({message:'Appointment List Fetching ERROR for Doctor'})
        }
    },

    //prescribe patients
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
            const{disease,prescription}=req.body;
            const patient=await Patient.findById(req.params.id).exec();
            patient.prescription=patient.prescription.concat(prescription);
            patient.disease=patient.disease.concat(disease);
            //prescribe.set(req.body);
            const result=await patient.save();
            res.status(200).json({patient})

        }
        catch(error)
        {
            console.error('Error in prescribe medicine',error)
            res.status(500).json({message:'Error in prescribe medicine'})
        }
    },

    //Get Patient By ID
    getPatientById:async(req,res) =>{
        try{
            const token = getTokenFrom(req);
            console.log("TOOKE  __ > "+token)
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_DOCTOR);
            console.log("DECODED_NEW  --> "+decodedToken.patientId)
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
                console.log("INVALID TOKEN")
            }
            const patient=await Patient.findById(req.params.id).exec();
            console.log("PatientDetails  --- >"+patient)
            res.status(200).json({patient})
            
        }
        catch(error){
            console.error('Error in Fetching Patient By ID',error)
            res.status(500).json({message:'Error in Fetching Patient By ID'})
        }
    },

     //Delete Patient By Doctor
    deletePatientByDoctor:async(req,res)=>{
        try{
            const token = getTokenFrom(req);
            console.log("TOKEN  __ > "+token)
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_DOCTOR);
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
                console.log("INVALID TOKEN")
            }
            const patient=await Patient.findByIdAndDelete(req.params.id).exec();
            console.log("Deleted")
            res.status(200).json({message:"Deleted Successfully"})
        }
        catch(error)
        {
            console.error('Error in booking appointment',error)
            res.status(500).json({message:'Patient Appointment Booking ERROR'})
        }
    },
}

module.exports=doctorDashboard;