const express = require('express');
const router = express.Router();
const {updateRest, deleteRest} = require('../controllers/sqlite');

/* GET rests listing. */
router.post('/editRest', updateRest);
router.post('/deleteRest', deleteRest);

module.exports = router;
