const Patient=require('../../models/patient');
const Doctor=require('../../models/doctor');
const Admin=require('../../models/admin')
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken");
const config=require('../../utils/config');
const { request } = require('express');

const SECRET_KEY_ADMIN=config.SECRET_KEY_ADMIN;

const getTokenFrom = (request) => {
    const authHeader = request.header('Authorization');
    //const authHeader = request.get('Authorization');
    return authHeader;
}

const adminDashboard ={
    //Get all Patients
    getAllPatientsByAdmin:async(req,res) =>{
        try{
            const token = getTokenFrom(req);
            console.log("TOOKE  __ > "+token)
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
            // console.log("DECODED_NEW  --> "+decodedToken.doctorId)
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
                console.log("INVALID TOKEN")
            }
            const allpatient=await Patient.find().exec();
            console.log("AllPatientDetails --- >"+allpatient)
            res.status(200).json({allpatient})
        }
        catch(error)
        {
            console.error('Error in Fetching All Patients Details By Admin',error)
            res.status(500).json({message:'Error in Fetching All Patients Details By Admin'})
        }
    },

    //Add Patient By Admin
    addPatientByAdmin:async(req,res)=>{
        try{
            const{name,age,email,password,address,phone} = req.body;
            console.log(name,age,email,password,address,phone)
            //check if user exists
            const existingPatient= await Patient.findOne({email});

            if(existingPatient)
            {
                return res.status(409).json({message:'Patient already exists'});
            }

            //hash the password befor saving
            const hashedPassword=await bcrypt.hash(password,10);

            //create new Patient
            const newPatient = new Patient({
                name,
                age,
                email,
                password:hashedPassword,
                address,
                phone,
                
            });

            //save the Patient
            await newPatient.save();
            res.status(201).json({message:"Patient created successfully"})
        }
        catch(error)
        {
            console.error('Error signing up Patient',error)
            res.status(500).json({message:'Patient SignupError'})
        }
    },

    //Edit Patient By admin 
    editPatientByAdmin: async(req,res)=>{
            try{
                const token = getTokenFrom(req);
                console.log("TOKEN  __ > "+token)
                // decode the token to authorize the user
                const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
                // if the token is not valid, return an error
                if(!decodedToken){
                    return response.json({ message: 'token invalid' });
                    console.log("INVALID TOKEN")
                }
                const patient=await Patient.findByIdAndUpdate(req.params.id).exec();
                
                patient.set(req.body)
                const result=await patient.save();
                console.log(result)
                res.status(200).json({result})
            }
            catch(error)
            {
                console.error('ERROR in adding Patient By Admin',error)
                res.status(500).json({message:'ERROR in adding Patient By Admin'})
            }
    },

    //Delete Patient By Admin
    deletePatientByAdmin:async(req,res)=>{
        try{
            const token = getTokenFrom(req);
            console.log("TOKEN  __ > "+token)
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
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

    //get all doctors
    getAllDoctorsByAdmin:async(req,res) =>{
        try{
            const token = getTokenFrom(req);
            console.log("TOOKE  __ > "+token)
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
            // console.log("DECODED_NEW  --> "+decodedToken.doctorId)
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
                console.log("INVALID TOKEN")
            }
            const alldoctors=await Doctor.find().exec();
            console.log("AllDoctorDetails --- >"+alldoctors)
            res.status(200).json({alldoctors})
        }
        catch(error)
        {
            console.error('Error in Fetching All Doctors Details By Admin',error)
            res.status(500).json({message:'Error in Fetching All Doctors Details By Admin'})
        }
    },

    //Add Doctor By Admin
    addDoctorByAdmin:async(req,res)=>{
        try{
            const{name,email,password,specialist,fee} = req.body;
            console.log(name,email,password,specialist,fee)
            //check if user exists
            const existingDoctor= await Doctor.findOne({email});

            if(existingDoctor)
            {
                return res.status(409).json({message:'Doctor already exists'});
            }

            //hash the password befor saving
            const hashedPassword=await bcrypt.hash(password,10);

            //create new Admin
            const newDoctor = new Doctor({
                name,
                email,
                password:hashedPassword,
                specialist,
                fee,
            });

            //save the Admin
            await newDoctor.save();
            res.status(201).json({message:"Doctor created successfully"})
        }
        catch(error)
        {
            console.error('Error signing up Doctor',error)
            res.status(500).json({message:'Doctor SignupError'})
        }
    },

    //Edit Doctor By Admin 
    editDoctorByAdmin: async(req,res)=>{
            try{
                const token = getTokenFrom(req);
                console.log("TOKEN  __ > "+token)
                // decode the token to authorize the user
                const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
                // if the token is not valid, return an error
                if(!decodedToken){
                    return response.json({ message: 'token invalid' });
                    console.log("INVALID TOKEN")
                }
                const doctor=await Doctor.findByIdAndUpdate(req.params.id).exec();
                
                doctor.set(req.body)
                const result=await doctor.save();
                console.log(result)
                res.status(200).json({result})
            }
            catch(error)
            {
                console.error('ERROR in adding Doctor By Admin',error)
                res.status(500).json({message:'ERROR in adding Doctor By Admin'})
            }
    },

    //Delete Doctor By Admin
    deleteDoctorByAdmin:async(req,res)=>{
        try{
            const token = getTokenFrom(req);
            console.log("TOKEN  __ > "+token)
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
                console.log("INVALID TOKEN")
            }
            const doctor=await Doctor.findByIdAndDelete(req.params.id).exec();
            console.log("Deleted")
            res.status(200).json({message:"Deleted Successfully"})
        }
        catch(error)
        {
            console.error('Error in deleting Doctor',error)
            res.status(500).json({message:'Error in deleting Doctor'})
        }
    },
    
}

module.exports=adminDashboard