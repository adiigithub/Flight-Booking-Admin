const express = require('express');
const Flight = require('../models/Flight');
const User = require('../models/User');
const router = express.Router();

// Book a flight
router.post('/book', async (req, res) => {
  const { flightId, userId } = req.body;
  const flight = await Flight.findById(flightId);
  const user = await User.findById(userId);

  if (flight && user) {
    user.bookings.push(flight);
    await user.save();
    res.status(200).json({ message: 'Flight booked successfully' });
  } else {
    res.status(400).json({ message: 'Flight or user not found' });
  }
});

// Cancel a booking
router.post('/cancel', async (req, res) => {
  const { flightId, userId } = req.body;
  const user = await User.findById(userId);

  if (user) {
    user.bookings = user.bookings.filter((booking) => booking.toString() !== flightId);
    await user.save();
    res.status(200).json({ message: 'Booking canceled successfully' });
  } else {
    res.status(400).json({ message: 'User not found' });
  }
});

// Get booking history
router.get('/:userId/history', async (req, res) => {
  const user = await User.findById(req.params.userId).populate('bookings');
  
  if (user) {
    res.status(200).json(user.bookings);
  } else {
    res.status(400).json({ message: 'User not found' });
  }
});

// Search flights by origin and destination
router.get('/search', async (req, res) => {
    const { origin, destination } = req.query;
    const flights = await Flight.find({
      origin: { $regex: origin, $options: 'i' },
      destination: { $regex: destination, $options: 'i' }
    });
  
    if (flights.length > 0) {
      res.status(200).json(flights);
    } else {
      res.status(404).json({ message: 'No flights found' });
    }
  });


  

module.exports = router;
