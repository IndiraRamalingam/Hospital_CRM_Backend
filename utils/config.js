const dotenv=require('dotenv');
dotenv.config();

const MONGO_URI=process.env.MONGO_URI;
const PORT=process.env.PORT;
const SECRET_KEY_ADMIN=process.env.SECRET_KEY_ADMIN;
const SECRET_KEY_DOCTOR=process.env.SECRET_KEY_DOCTOR;
const SECRET_KEY_PATIENT=process.env.SECRET_KEY_PATIENT;
const USER=process.env.USER;
const PASSWORD = process.env.PASSWORD;

module.exports={
    MONGO_URI,
    PORT,
    SECRET_KEY_ADMIN,
    SECRET_KEY_DOCTOR,
    SECRET_KEY_PATIENT,
    USER,
    PASSWORD,
}