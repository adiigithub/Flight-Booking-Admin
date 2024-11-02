const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const flightRoutes = require('./routes/flightRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/flight_booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/flights', flightRoutes);
app.use('/api/users', userRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
