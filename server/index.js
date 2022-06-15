const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const { connectMongo } = require('./config/mongo');

dotenv.config();

const app = express();

connectMongo();

app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1/books', require('./routes/books'));
app.use('/api/v1/transactions', require('./routes/transactions'));
app.use('/api/v1/people', require('./routes/person'));
app.use('/api/v1/tickets', require('./routes/tickets'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});
