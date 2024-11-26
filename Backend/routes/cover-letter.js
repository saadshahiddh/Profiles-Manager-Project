var express = require('express');
var router = express.Router();
const coverLetterController = require('../controllers/cover-letter');


//  Routes & Functions

router.post("/create", coverLetterController.createCoverLetter);
router.patch("/update", coverLetterController.updateCoverLetter);
router.delete("/delete/:coverLetterId", coverLetterController.deleteCoverLetter);
router.get("/get/:coverLetterId", coverLetterController.getCoverLetter);
router.get("/get-all", coverLetterController.getAllCoverLetters);
router.get("/get-by-profile/:profileId", coverLetterController.getCoverLettersByProfile);


module.exports = router;
