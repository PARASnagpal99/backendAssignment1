const express = require('express');
const router = express.Router();
const {studentAuthentication , deanAuthentication} = require('../controllers/authController')


router.post('/student-authenticate', studentAuthentication);
router.post('/dean-authenticate', deanAuthentication);

module.exports = router;
