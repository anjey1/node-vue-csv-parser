const express = require('express');
const router = express.Router();
const {getRests, updateDB, updateLocation} = require('../controllers/sqlite');

/* GET rests listing. */
router.get('/getCsv', getRests);
router.post('/postCsv',  updateLocation,  updateDB);

module.exports = router;
