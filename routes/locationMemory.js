const express = require('express');
const router = express.Router();
const locationMemoryController = require('../controllers/locationMemoryController');


router.route('/')
    .get(locationMemoryController.getAllRecordss)
    .post(locationMemoryController.createRecord)
router.route('/:username')
    
    .get(locationMemoryController.getRecord)
    .put(locationMemoryController.updateRecord)
    

module.exports = router;