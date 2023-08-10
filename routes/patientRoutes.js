const express=require('express')
const router=express.Router();
const patientAuth=require('../controllers/Patient/patientAuth');
const patientDashboard=require('../controllers/Patient/patientDashboard');


router.post('/signup',patientAuth.signup)
router.post('/signin',patientAuth.signin)

router.get('/',patientDashboard.getPatient)
//router.put('/book_appointment',patientDashboard.bookAppointment)

module.exports=router;