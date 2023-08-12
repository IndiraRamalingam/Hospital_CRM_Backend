const express=require('express')
const router=express.Router();
const doctorAuth=require('../controllers/Doctor/doctorAuth');
const doctorDashboard=require('../controllers/Doctor/doctorDashboard');

router.post('/signup',doctorAuth.signup)
router.post('/signin',doctorAuth.signin)

router.get('/view_patients',doctorDashboard.viewPatients)
router.get('/get_patients/:id',doctorDashboard.getPatientById)
router.put('/prescribe_patients/:id',doctorDashboard.prescribeMedicine)
router.delete('/delete_patients/:id',doctorDashboard.deletePatientByDoctor)



module.exports=router;