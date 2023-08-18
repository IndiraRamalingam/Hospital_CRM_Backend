const Contact = require('../models/contact')
const config=require('../utils/config')

const contactController={
    contactControl:async(req,res)=>{
        try{
            const{name,email,phone,message}=req.body;

            const newContact=new Contact({
                name,
                email,
                phone,
                message
            });
            await newContact.save();
            res.status(201).json({message:"Contact created successfully"})

        }
        catch(error)
        {
            console.log("Error in contacts "+error)
        }
    }

}

module.exports=contactController;