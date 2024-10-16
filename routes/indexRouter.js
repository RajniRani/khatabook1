const express=require("express");
const router = express.Router();
const { landingpageController,registerPageController,registerController,loginController,logoutController,profileController,createPageController } = require("../controllers/indexControllers");
const{isLoggedIn,redirectToProfile}=require("../middlewares/auth-middleware")


router.get("/",redirectToProfile,landingpageController)
router.get("/register",registerPageController)
router.post("/register",registerController)
router.post("/login",loginController)
router.get("/logout",logoutController)
router.get("/profile", isLoggedIn,profileController)

module.exports=router;