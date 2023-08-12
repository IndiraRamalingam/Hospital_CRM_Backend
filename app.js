const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const adminRoutes=require('./routes/adminRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const patientRoutes = require('./routes/patientRoutes')
const contactRoutes=require('./routes/contactRoutes')

//add middleware
app.use(bodyParser.json())
app.use(cors());

app.use('/api/contact',contactRoutes)
app.use('/api/admin',adminRoutes);
app.use('/api/doctor',doctorRoutes);
app.use('/api/patient',patientRoutes);

module.exports =app;

//http://localhost:3001/api/admin/signup