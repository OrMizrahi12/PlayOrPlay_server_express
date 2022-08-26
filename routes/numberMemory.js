const express = require('express');
const router = express.Router();
const numberMemoryController = require('../controllers/numberMemoryController');


router.route('/')
    .get(numberMemoryController.getAllRecordss)
    .post(numberMemoryController.createRecord)
router.route('/:username')
    
    .get(numberMemoryController.getRecord)
    .put(numberMemoryController.updateRecord)
    

module.exports = router;