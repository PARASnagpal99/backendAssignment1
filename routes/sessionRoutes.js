const express = require('express');
const router = express.Router();
const {verifyStudentToken , verifyDeanToken} = require('../middleware/authentication')
const {listFreeSessions , bookSession , listPendingSessions , insertSessions} = require('../controllers/sessionController');


router.get('/free-sessions', verifyStudentToken, listFreeSessions);
router.post('/book-session',verifyStudentToken, bookSession);
router.get('/pending-sessions', verifyDeanToken, listPendingSessions);
router.post('/insert-sessions', verifyDeanToken, insertSessions);


module.exports = router;
