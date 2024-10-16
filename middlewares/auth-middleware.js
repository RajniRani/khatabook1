// const jwt=require("jsonwebtoken")
// module.exports.isLoggedIn= async function(req,res,next){
//     if(req.cookies.token){
//         try{
//    let decoded= await  jwt.verify(req.cookies.token,process.env.JWT_KEY)
//    req.user=decoded;
//    next()
//         }catch(err){
//           return  res.redirect("/")
//           }
//         } else{
//      return res.redirect("/")
//     }
   
// }

// module.exports.redirectToProfile= async function(req,rea,next){
//     if(req.cookies.token){
//     try{
//         let decoded= await  jwt.verify(req.cookies.token,process.env.JWT_KEY)
//           return res.redirect("/profile");
        
//     }
//     catch(err){
//        return next();
//     }
// }
//     else return next();
// }

const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports.isLoggedIn = async function(req, res, next) {
    if (req.cookies.token) {
        try {
            let decoded = await jwt.verify(req.cookies.token, process.env.JWT_KEY);
           let user=  await userModel.findOne({email:decoded.email})
           req.user=user;
            next();
        } catch (err) {
            return res.redirect("/");
        }
    } else {
        return res.redirect("/");
    }
};

module.exports.redirectToProfile = async function(req, res, next) {
    if (req.cookies.token) {
        try {
            let decoded = await jwt.verify(req.cookies.token, process.env.JWT_KEY);
            return res.redirect("/profile");
        } catch (err) {
            return next();
        }
    } else {
        return next();
    }
};