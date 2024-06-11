const express = require('express');
const { registerController, loginController, onLoginController, updateProfilController, editProfilController } = require('../controller/userController');
const { verifyToken } = require('../middleware/authToken');
const bucketUpload = require('../utils/uploadToBucket');

const multer = require('../middleware/uploadImage');
const handleUploadError = require('../middleware/uploadError');

const router = express.Router();

router.post('/register', multer.single("profile_img"), bucketUpload.uploadToBucket, registerController);
router.post('/login', multer.none(), loginController);

router.get('/auth', verifyToken, onLoginController);
router.get('/profile/:id', verifyToken, editProfilController);
//router.put('/profile/:id', verifyToken, multer.single('profile_image'), bucketUpload.uploadToBucket, updateProfilController);

//router.use(handleUploadError);

module.exports = router;