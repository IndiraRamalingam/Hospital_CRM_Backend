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
    return authHeader;
}

const adminDashboard ={
    //Get all Patients
    getAllPatientsByAdmin:async(req,res) =>{
        try{
            const token = getTokenFrom(req);
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
            }
            const allpatient=await Patient.find().exec();

            const countOfPatients=await Patient.find().count();

            res.status(200).json({allpatient,countOfPatients})
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
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
            }
            const patient=await Patient.findById(req.params.id).exec();
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
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);

            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
            }
            const{name,age,gender,email,password,address,phone} = req.body;

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
                gender,
                email,
                password:hashedPassword,
                address,
                phone,  
            });

            await newPatient.save();

            res.status(201).json({message:"Patient added successfully"})
        }
        catch(error)
        {
            console.error('Error creating Patient',error)
            res.status(500).json({message:'Patient Creating Error'})
        }
    },

    //Edit Patient By admin 
    editPatientByAdmin: async(req,res)=>{
            try{
                const token = getTokenFrom(req);
                // decode the token to authorize the user
                const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
                // if the token is not valid, return an error
                if(!decodedToken){
                    return response.json({ message: 'token invalid' });
                }
                const patient=await Patient.findByIdAndUpdate(req.params.id).exec();
                
                patient.set(req.body)
                const result=await patient.save();
                res.status(200).json({result})
            }
            catch(error)
            {
                console.error('ERROR in editing Patient By Admin',error)
                res.status(500).json({message:'ERROR in editing Patient By Admin'})
            }
    },

    //Delete Patient By Admin
    deletePatientByAdmin:async(req,res)=>{
        try{
            const token = getTokenFrom(req);
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
            }
            const patient=await Patient.findByIdAndDelete(req.params.id).exec();
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

            const countOfDoctors=await Doctor.find().count();

            res.status(200).json({alldoctors,countOfDoctors})
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
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
            }
            const alldoctors=await Doctor.find().exec();

            const countOfgeneral=await Doctor.find({specialist:{$eq:'General Physician'}}).count();
            const countOfPaediatrician=await Doctor.find({specialist:{$eq:'Paediatrician'}}).count();
            const countOfGynecologist=await Doctor.find({specialist:{$eq:'Gynecologist'}}).count();
            const countOfPhysiotherapist=await Doctor.find({specialist:{$eq:'Physiotherapist'}}).count();
            const countOfDiabetologist=await Doctor.find({specialist:{$eq:'Diabetologist'}}).count();
            const countOfGastroenterologist=await Doctor.find({specialist:{$eq:'Gastroenterologist'}}).count();

            res.status(200).json({alldoctors,countOfgeneral,countOfPaediatrician,countOfGynecologist,countOfPhysiotherapist,countOfDiabetologist,countOfGastroenterologist})
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
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
            }
            const doctor=await Doctor.findById(req.params.id).exec();
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
                // decode the token to authorize the user
                const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
                // if the token is not valid, return an error
                if(!decodedToken){
                    return response.json({ message: 'token invalid' });
                }
                const doctor=await Doctor.findByIdAndUpdate(req.params.id).exec();
                
                doctor.set(req.body)
                const result=await doctor.save();
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
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
            }
            const doctor=await Doctor.findByIdAndDelete(req.params.id).exec();
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
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
            }
            const allcontact=await Contact.find().exec();

            const countOfContacts=await Contact.find().count();

            res.status(200).json({allcontact,countOfContacts})
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
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY_ADMIN);
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
            }
            const contact=await Contact.findByIdAndDelete(req.params.id).exec();
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