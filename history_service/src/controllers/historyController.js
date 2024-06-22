const { getHistory, getTotalRecords, addHistoryEvent } = require('../providers/historyProvider');

const getHistoryController = async (req, res) => {
  try {
    const { userId, page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const history = await getHistory(userId, limit, offset);
    const totalRecords = await getTotalRecords(userId);

    res.status(200).json({
      totalRecords,
      totalPages: Math.ceil(totalRecords / parseInt(limit, 10)),
      currentPage: parseInt(page, 10),
      history,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching history.' });
  }
};

const addHistoryEventController = async (req, res) => {
  const { action, userId, timestamp } = req.body;
  try {
    const newEvent = await addHistoryEvent(action, userId, timestamp);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving history.' });
  }
};

module.exports = {
  getHistoryController,
  addHistoryEventController,
};
