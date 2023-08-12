const express=require('express')
const router=express.Router();
const adminAuth=require('../controllers/Admin/adminAuth');
const adminDashboard=require('../controllers/Admin/adminDashboard');

router.post('/signup',adminAuth.signup)
router.post('/signin',adminAuth.signin)

router.get('/patients',adminDashboard.getAllPatientsByAdmin)
router.get('/patientsById/:id',adminDashboard.getPatientById)
router.post('/addPatient',adminDashboard.addPatientByAdmin)
router.put('/editPatient/:id',adminDashboard.editPatientByAdmin)
router.delete('/deletePatient/:id',adminDashboard.deletePatientByAdmin)

router.get('/doctors',adminDashboard.getAllDoctorsByAdmin)
router.get('/doctors/:id',adminDashboard.getDoctorById)
router.post('/addDoctor',adminDashboard.addDoctorByAdmin)
router.put('/editDoctor/:id',adminDashboard.editDoctorByAdmin)
router.delete('/deleteDoctor/:id',adminDashboard.deleteDoctorByAdmin)
router.get('/getAllDoctorName',adminDashboard.getAllDoctorName)

module.exports=router;