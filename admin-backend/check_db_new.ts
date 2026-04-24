import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Profile from './src/models/Profile.js';
import Project from './src/models/Project.js';
import Skill from './src/models/Skill.js';
import Service from './src/models/Service.js';

dotenv.config();

const checkDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio');
    console.log('Connected to:', mongoose.connection.name);

    const profileCount = await Profile.countDocuments();
    const projectCount = await Project.countDocuments();
    const skillCount = await Skill.countDocuments();
    const serviceCount = await Service.countDocuments();

    console.log('--- Database Stats ---');
    console.log('Profiles:', profileCount);
    console.log('Projects:', projectCount);
    console.log('Skills:', skillCount);
    console.log('Services:', serviceCount);

    if (skillCount > 0) {
      const skills = await Skill.find().limit(5);
      console.log('\nSample Skills:');
      skills.forEach(s => console.log(`- ${s.name} (${s.category})`));
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error checking DB:', err);
  }
};

checkDb();
