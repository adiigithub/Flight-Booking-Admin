const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = 'AdityaTripathiBadhyaSDR';


// User registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token, userId: user._id });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
