const express = require('express');
const { createDonationController, getDonationByIdController, getAllDonationsController, getAllDonationsbyidController } = require('../controller/donationController');
const { verifyToken } = require('../middleware/authToken');
const bucketUpload = require('../utils/uploadToBucket');
const multer = require('../middleware/uploadImage');

const router = express.Router();

router.post('/', multer.single("image"), bucketUpload.uploadToBucket, createDonationController);
router.get('/:id', getDonationByIdController);
router.get('/', getAllDonationsController);
router.get('/', getAllDonationsbyidController);

module.exports = router;
