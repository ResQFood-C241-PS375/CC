const express = require('express');
const { registerController, loginController, onLoginController, updateProfilController, editProfilController, getUserbyidController } = require('../controller/userController');
const { verifyToken } = require('../middleware/authToken');
const bucketUpload = require('../utils/uploadToBucket');
const { getAllDonationsbyidController, deleteDonationsbyidController} = require('../controller/donationController')

const multer = require('../middleware/uploadImage');
const handleUploadError = require('../middleware/uploadError');
const { getAllSellsbyidController, deleteSellsbyidController } = require('../controller/sellController');

const router = express.Router();

router.post('/register', multer.single("profile_img"), bucketUpload.uploadToBucket, registerController);
router.post('/login', multer.none(), loginController);

router.get('/auth', verifyToken, onLoginController);
// router.get('/profile/:id', verifyToken, editProfilController);
//router.put('/profile/:id', verifyToken, multer.single('profile_image'), bucketUpload.uploadToBucket, updateProfilController);
router.get('/profile/donation/:id', getAllDonationsbyidController);
router.get('/profile/sell/:id', getAllSellsbyidController);
router.get('/profile/:id', getUserbyidController);
router.delete('/profile/donation/:id', deleteDonationsbyidController);
router.delete('/profile/sell/:id', deleteSellsbyidController);
//router.use(handleUploadError);

module.exports = router;