const { isLoggedIn } = require("../middlewares/auth-middleware");
const hisaabModel = require("../models/hisaab-model");
const userModel=require("../models/user-model")

module.exports.createHisaabController= async function(req,res){
    let{title,description,encrypted,shareable,passcode,editpermissions}=req.body;
     console.log(req.body);
     encrypted = encrypted ==='on'? true:false;
    shareable = shareable ==='on'? true:false;
     editpermissions = editpermissions==='on'? true:false;

   try{
    let hisaabcreated= await hisaabModel.create({
        title,
        description,
        user:req.user._id,
        encrypted,
        shareable,
        passcode,
        editpermissions
    });
  let user= await userModel.findOne({email:req.user.email});
  user.hisaab.push(hisaabcreated._id);
   await user.save();

   res.redirect("/profile")
   }
   catch(err){
    res.send(err.message)
   }

  
}

module.exports.hisaabPageController= async function(req,res){
    res.render("create")
}

module.exports.readHisaabController= async function(req,res){

    const id= req.params.id;
    const hisaab=await hisaabModel.findOne({
           _id:id
    });
    res.render("hisaab",{isLoggedIn:true,hisaab});
}


module.exports.deleteController= async function(req,res){

    const id= req.params.id;
    const hisaab=await hisaabModel.findOne({
           _id:id,
           user:req.user.id
    });
   if(!hisaab){
    return res.redirect('/profile')
   }
    await hisaabModel.deleteOne({
        _id:id
    })
    return res.redirect('/profile')
}


module.exports.editController= async function(req,res){

    const id= req.params.id;
    const hisaab=await hisaabModel.findById({
           _id:id,
           user:req.user.id
    });
   if(!hisaab){
    return res.redirect('/profile')
   }

    return res.render("edit",{isLoggedin: true,hisaab})
}



module.exports.editPostController = async function(req, res) {
    const id = req.params.id;

    try {
        // Find the hisaab document by ID and ensure it belongs to the current user
        const hisaab = await hisaabModel.findOne({
            _id: id,
            user: req.user._id
        });

        if (!hisaab) {
            // If no hisaab is found or does not belong to the user, redirect to profile
            return res.redirect('/profile');
        }

        // Update the fields of the hisaab document
        hisaab.title = req.body.title;
        hisaab.description = req.body.description;  // Changed from 'data' to 'description'
        hisaab.editpermissions = req.body.editpermissions === 'on';  // Fixed field name
        hisaab.encrypted = req.body.encrypted === 'on';  // Fixed field name
        hisaab.passcode = req.body.passcode;
        hisaab.shareable = req.body.shareable === 'on';

        // Save the updated hisaab document
        await hisaab.save();

        // Redirect to profile page after successful update
        res.redirect("/profile");
    } catch (err) {
        // Handle any errors and send an error message
        res.send(err.message);
    }
}
