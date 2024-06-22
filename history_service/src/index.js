const express = require('express');
const bodyParser = require('body-parser');
const historyRoutes = require('./routes/historyRoutes');

const app = express();

app.use(bodyParser.json());
app.use(historyRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`History service is running on port ${PORT}`);
});
