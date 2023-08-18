const Admin=require('../../models/admin');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config=require('../../utils/config');

const SECRET_KEY_ADMIN=config.SECRET_KEY_ADMIN;

const adminAuth={
    signup:async(req,res)=>{
        try{
            const{name,email,password} = req.body;

            //check if user exists
            const existingAdmin= await Admin.findOne({email});

            if(existingAdmin)
            {
                return res.status(409).json({message:'Admin already exists'});
            }

            //hash the password befor saving
            const hashedPassword=await bcrypt.hash(password,10);

            //create new Admin
            const newAdmin = new Admin({
                name,
                email,
                password:hashedPassword,
            });

            //save the Admin
            await newAdmin.save();
            res.status(201).json({message:"Admin created successfully"})
        }
        catch(error)
        {
            res.status(500).json({message:'Admin SignupError'})
        }
    },

    signin:async(req,res)=>{
        try{
            const {email,password}=req.body;

            //find the admin by email
            const admin=await Admin.findOne({email});

            if(!admin){
                return res.status(401).json({message: 'Authentication Failed'});
            }

            //compare passwords
            const passwordMatch=await bcrypt.compare(password,admin.password);

            if(!passwordMatch)
            {
                return res.status(401).json({message: 'Authentication Failed'});
            }

            //generate and send the jwt token 
            const token=jwt.sign({adminId:admin._id},SECRET_KEY_ADMIN,{expiresIn:'1h'});
            res.json({token});
            }
            catch(error){
                console.log('Error signing in Admin', error);
                res.status(500).json({message: 'Internal Server error'});
            }
    }
}

module.exports=adminAuth;
