const express = require("express");
const router = express.Router();
const { createHisaabController, hisaabPageController,readHisaabController,deleteController,editController,editPostController} = require("../controllers/hisaabController");
const { isLoggedIn } = require("../middlewares/auth-middleware");

router.get("/create", isLoggedIn, hisaabPageController);
router.post("/create", isLoggedIn, createHisaabController);
router.get("/view/:id",isLoggedIn,readHisaabController);
router.get("/delete/:id",isLoggedIn,deleteController);
router.get("/edit/:id",isLoggedIn,editController)
router.post("/edit/:id",isLoggedIn,editPostController)


module.exports = router;
