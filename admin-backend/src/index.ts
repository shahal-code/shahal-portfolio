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
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    const adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      await User.create({
        email: adminEmail,
        password: hashedPassword
      });
      console.log('Admin user created successfully');
    } else {
      // Always sync password with environment variable
      adminUser.password = hashedPassword;
      await adminUser.save();
      console.log(`Admin system ready for: ${adminEmail}`);
    }
  })
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
