const Patient=require('../../models/patient');
const Doctor=require('../../models/doctor');
const Admin=require('../../models/admin')
const Contact = require('../../models/contact')

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

    
    //Get Patient By ID
    getPatientById:async(req,res) =>{
        try{
            const token = getTokenFrom(req);
            console.log("TOOKE  __ > "+token)
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
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


    //Add Patient By Admin
    addPatientByAdmin:async(req,res)=>{
        try{
            const token = getTokenFrom(req);
            console.log("TOOKE  __ > "+token)
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);

            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
                console.log("INVALID TOKEN")
            }
            const{name,age,gender,email,password,address,phone,specialist} = req.body;
            console.log("GGGG   "+name,age,gender,email,password,address,phone,specialist)
            //check if user exists
            const existingPatient= await Patient.findOne({email});

            if(existingPatient)
            {
                return res.status(409).json({message:'Patient already exists'});
            }

            //hash the password befor saving
            const hashedPassword=await bcrypt.hash(password,10);

            const doctor=await Doctor.findOne({specialist});
            //create new Patient
            const newPatient = new Patient({
                name,
                age,
                gender,
                email,
                password:hashedPassword,
                address,
                phone,  
                specialist,  
                doctor:doctor._id,
            });

            const savedPatient=await newPatient.save();

            doctor.patient=doctor.patient.concat(savedPatient._id);
            
            await doctor.save();
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
 
    //getAll DoctorName and Fee

    getAllDoctorName:async(req,res) =>{
        try{          
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


    //Get Patient By ID
    getDoctorById:async(req,res) =>{
        try{
            const token = getTokenFrom(req);
            console.log("TOOKE  __ > "+token)
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
                console.log("INVALID TOKEN")
            }
            const doctor=await Doctor.findById(req.params.id).exec();
            console.log("DoctorDetails  --- >"+doctor)
            res.status(200).json({doctor})
            
        }
        catch(error){
            console.error('Error in Fetching Doctor By ID',error)
            res.status(500).json({message:'Error in Fetching Doctor By ID'})
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
    
     //Get all Contacts
     getAllContacts:async(req,res) =>{
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
            const allcontact=await Contact.find().exec();
            console.log("AllContactDetails --- >"+allcontact)
            res.status(200).json({allcontact})
        }
        catch(error)
        {
            console.error('Error in Fetching All Contact Details By Admin',error)
            res.status(500).json({message:'Error in Fetching All Contacts Details By Admin'})
        }
    },

     //Delete Contact By Admin
     deleteContact:async(req,res)=>{
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
            const contact=await Contact.findByIdAndDelete(req.params.id).exec();
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