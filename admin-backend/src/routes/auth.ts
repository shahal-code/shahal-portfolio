import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = email.toLowerCase().trim();
    console.log(`Login attempt for: ${cleanEmail}`);
    
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      console.log(`Login failed: User not found for email ${cleanEmail}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Login failed: Password mismatch for ${cleanEmail}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log(`Login successful for: ${cleanEmail}`);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
