// const jwt = require("jsonwebtoken");
// const config=require('../../utils/config');
// 
// const SECRET_KEY_PATIENT=config.SECRET_KEY_PATIENT;
// 
// module.exports = function (req, res, next) {
//   const token = req.header("auth-token");
//   console.log("TTT==     "+token)
//   if (!token) return res.status(401).send("Access Denied");
// 
//   try {
//     const verified = jwt.verify(token,SECRET_KEY_PATIENT);
//     req.patient = verified.patientId;
//     next()
//     console.log("VERIFIED" + req.patient)
//   } catch (error) {
//     res.status(400).send("Invalid token");
//   }
// };