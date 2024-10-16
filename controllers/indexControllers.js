const userModel=require("../models/user-model")
const hisaabModel=require("../models/hisaab-model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

module.exports.landingpageController=function(req,res){
    res.render("index",{loggedin:false})
}

module.exports.registerPageController=function(req,res){
    res.render("register")
}

module.exports.registerController= async function(req,res){
    let {email,password,username,name}=req.body;
    
try{
    let user=await userModel.findOne({email});
    if(user) return res.render("You alredy have an account, please login");
   
   let salt=await bcrypt.genSalt(10);
   let hashed= await bcrypt.hash(password,salt);
   res.send(hashed);
 
  user= userModel.create({
     email,
     name,
     username,
     password:hashed,
   })
 
  let token= jwt.sign({id:user._id,email:user.email},process.env.JWT_KEY)
 res.cookie("token",token)
 res.send("account created succesfully")
 }
 catch(err){
    res.send(err.message);
   };
};


module.exports.loginController= async function(req,res){
  let{email,password}=req.body;

  let user= await userModel.findOne({email}).select("+password");
  if(!user) return res.send("You dont have an account please,create one.")

 let result=  await bcrypt.compare(password,user.password);
 if(result){
    let token= jwt.sign({id:user._id,email:user.email},process.env.JWT_KEY)
    res.cookie("token",token)
    res.redirect("/profile")
    }
    else{
      return  res.send("Your details are incorrect")
    }
 }

 module.exports.logoutController=async function(req,res){
    res.cookie("token","");
    return res.redirect("/")
}

module.exports.profileController= async function(req,res){
  let user= await userModel.findOne({email:req.user.email}).populate("hisaab")
    res.render("profile",{user:user})
}

