const Doctor=require('../../models/doctor');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config=require('../../utils/config');

const SECRET_KEY_DOCTOR=config.SECRET_KEY_DOCTOR;

const doctorAuth={
    signup:async(req,res)=>{
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

    signin:async(req,res)=>{
        try{
            const {email,password}=req.body;

            //find the admin by email
            const doctor=await Doctor.findOne({email});

            if(!doctor){
                return res.status(401).json({message: 'Authentication Failed'});
            }

            //compare passwords
            const passwordMatch=await bcrypt.compare(password,doctor.password);

            if(!passwordMatch)
            {
                return res.status(401).json({message: 'Authentication Failed'});
            }

            //generate and send the jwt token 
            const token=jwt.sign({doctorId:doctor._id},SECRET_KEY_DOCTOR,{expiresIn:'1h'});
            res.json({token});
        }
        catch(error){
            console.log('Error signing in Doctor', error);
            res.status(500).json({message: 'Internal Server error'});
        }
    }
}

module.exports=doctorAuth;
