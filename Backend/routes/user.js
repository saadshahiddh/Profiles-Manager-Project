var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const { multerSingleUploadRoute } = require('../services/file');


//  Routes & Functions
router.post("/create", userController.createUser);
router.patch("/update", userController.updateUser);
router.put("/update-photo/:userId", multerSingleUploadRoute, userController.updatePhoto);
router.delete("/delete/:userId", userController.deleteUser);
router.get("/get/:userId", userController.getUser);
router.get("/get-all", userController.getAllUsers);
router.post("/login", userController.loginUser);
router.patch("/change-password", userController.changePassword);
router.patch("/update-password", userController.updatePassword);


module.exports = router;
