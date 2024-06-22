const express = require('express');
const { getHistoryController, addHistoryEventController } = require('../controllers/historyController');

const router = express.Router();

router.get('/history', getHistoryController);
router.post('/history', addHistoryEventController);

module.exports = router;
