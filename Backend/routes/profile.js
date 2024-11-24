var express = require('express');
var router = express.Router();
const profileController = require('../controllers/profile');


//  Routes & Functions

router.post("/create", profileController.createProfile);
router.patch("/update", profileController.updateProfile);
router.delete("/delete/:profileId", profileController.deleteProfile);
router.get("/get/:profileId", profileController.getProfile);
router.get("/get-all", profileController.getAllProfiles);
router.get("/get-all-details", profileController.getAllProfileDetails);
router.get("/get-form-data/:profileId", profileController.getProfileFormData);
router.patch("/save-form-data", profileController.saveProfileFormData);


module.exports = router;
