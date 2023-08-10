const express=require('express')
const router=express.Router();
const doctorAuth=require('../controllers/Doctor/doctorAuth');
const doctorDashboard=require('../controllers/Doctor/doctorDashboard');

router.post('/signup',doctorAuth.signup)
router.post('/signin',doctorAuth.signin)

router.get('/view_patients',doctorDashboard.viewPatients)
router.put('/prescribe_patients/:id',doctorDashboard.prescribeMedicine)

module.exports=router;