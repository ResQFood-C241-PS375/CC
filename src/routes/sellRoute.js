const express = require('express');
const { 
    createSellController, 
    getSellByIdController, 
    getAllSellsController, 
    getSellsByUserIdController, 
    searchSellsByTitleController 
} = require('../controller/sellController');

const { verifyToken } = require('../middleware/authToken');
const bucketUpload = require('../utils/uploadToBucket');
const multer = require('../middleware/uploadImage');

const router = express.Router();

router.post('/', multer.single("sell_img"), bucketUpload.uploadToBucket, createSellController);
router.get('/:id', getSellByIdController);
router.get('/', getAllSellsController);
router.get('/user/:user_id', getSellsByUserIdController);
router.post('/search', searchSellsByTitleController);

module.exports = router;
