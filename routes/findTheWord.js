const express = require('express');
const router = express.Router();
const FindTheWordController = require('../controllers/findTheWordController');


router.route('/')
    .get(FindTheWordController.getAllRecordss)
    .post(FindTheWordController.createRecord)
router.route('/:username')
    
    .get(FindTheWordController.getRecord)
    .put(FindTheWordController.updateRecord)
    

module.exports = router;