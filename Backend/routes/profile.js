var express = require('express');
var router = express.Router();
const profileController = require('../controllers/profile');


//  Routes & Functions

router.post("/create", profileController.createProfile);
router.patch("/update", profileController.updateProfile);
router.delete("/delete/:profileId", profileController.deleteProfile);
router.get("/get/:profileId", profileController.getProfile);
router.get("/get-all", profileController.getAllProfiles);
router.get("/get-detail/:profileId", profileController.getProfileDetail);
router.patch("/save-detail", profileController.saveProfileDetail);


module.exports = router;
