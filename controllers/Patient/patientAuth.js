const Patient=require('../../models/patient');
const Doctor=require('../../models/doctor');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config=require('../../utils/config');

const SECRET_KEY_PATIENT=config.SECRET_KEY_PATIENT;

const patientAuth={
    signup:async(req,res)=>{
        try{
            const{name,age,gender,email,password,address,phone} = req.body;
            console.log(name,age,gender,email,password,address,phone)
            //check if user exists
            const existingPatient= await Patient.findOne({email});

            if(existingPatient)
            {
                return res.status(409).json({message:'Patient already exists'});
            }

            //hash the password befor saving
            const hashedPassword=await bcrypt.hash(password,10);

            //GEtting the list of doctors name
            const doctorList=await Doctor.find({},{name:1,_id:0}).exec();
            console.log("DoctorList --- >  "  +doctorList)


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

    signin:async(req,res)=>{
        try{
            const {email,password}=req.body;

            //find the Patient by email
            const patient=await Patient.findOne({email});

            if(!patient){
                return res.status(401).json({message: 'Authentication Failed'});
            }

            //compare passwords
            const passwordMatch=await bcrypt.compare(password,patient.password);

            if(!passwordMatch)
            {
                return res.status(401).json({message: 'Authentication Failed'});
            }

            //generate and send the jwt token 
            const token=jwt.sign({patientId:patient._id},SECRET_KEY_PATIENT,{expiresIn:'1h'});
            res.json({token});
        }
        catch(error){
            console.log('Error signing in Patient', error);
            res.status(500).json({message: 'Internal Server error'});
        }
    }
}

module.exports=patientAuth;
