var express = require('express');
var router = express.Router();
const faqController = require('../controllers/faq');


//  Routes & Functions

router.post("/create", faqController.createFaq);
router.patch("/update", faqController.updateFaq);
router.delete("/delete/:faqId", faqController.deleteFaq);
router.get("/get/:faqId", faqController.getFaq);
router.get("/get-all", faqController.getAllFaqs);
router.get("/get-by-profile/:profileId", faqController.getFaqsByProfile);


module.exports = router;
