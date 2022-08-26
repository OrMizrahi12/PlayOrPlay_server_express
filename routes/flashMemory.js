const express = require('express');
const router = express.Router();
const flashMemoryController = require('../controllers/flashMemoryController');


router.route('/')
    .get(flashMemoryController.getAllRecordss)
    .post(flashMemoryController.createRecord)
router.route('/:username')
    
    .get(flashMemoryController.getRecord)
    .put(flashMemoryController.updateRecord)
    

module.exports = router;