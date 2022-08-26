const express = require('express');
const router = express.Router();
const flashBoxSController = require('../controllers/flashBoxController');


router.route('/')
    .get(flashBoxSController.getAllRecordss)
    .post(flashBoxSController.createRecord)
router.route('/:username')
  
    .get(flashBoxSController.getRecord)
    .put(flashBoxSController.updateRecord)

module.exports = router;