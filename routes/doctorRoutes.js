const express=require('express')
const router=express.Router();
const doctorAuth=require('../controllers/Doctor/doctorAuth');
const doctorDashboard=require('../controllers/Doctor/doctorDashboard');

router.post('/signup',doctorAuth.signup)
router.post('/signin',doctorAuth.signin)

router.get('/view_appointment',doctorDashboard.viewAppointment)

module.exports=router;