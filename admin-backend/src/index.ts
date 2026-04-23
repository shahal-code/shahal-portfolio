import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import portfolioRoutes from './routes/portfolio.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Portfolio Backend is Running 🚀');
});

app.get('/api', (req, res) => {
  res.json({ status: 'API is Online', version: '1.0.0' });
});

app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(async () => {
    console.log('Connected to MongoDB');
    // Auto-seed or Update admin user
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@gmail.com').toLowerCase().trim();
    const adminPassword = (process.env.ADMIN_PASSWORD || 'admin').trim();
    
    console.log(`Checking admin system for: ${adminEmail}`);
    
    const adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      await User.create({
        email: adminEmail,
        password: adminPassword // Plain text: User model pre-save hook will hash this
      });
      console.log('Admin user created successfully');
    } else {
      // Check if current password matches environment variable to avoid double hashing and unnecessary writes
      const isMatch = await bcrypt.compare(adminPassword, adminUser.password);
      if (!isMatch) {
        console.log('Admin password mismatch detected. Updating password...');
        adminUser.password = adminPassword; // Set plain text: User model pre-save hook will hash this
        await adminUser.save();
        console.log('Admin password updated successfully');
      } else {
        console.log(`Admin system ready for: ${adminEmail}`);
      }
    }
  })
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
