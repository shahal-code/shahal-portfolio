import mongoose from 'mongoose';

// Single document to store general settings like name, role, bio
const profileSchema = new mongoose.Schema({
  name: String,
  role: String,
  bio: String,
  about: {
    heading: String,
    headingAccent: String,
    description: String,
    summary: String,
  },
  experienceCount: String, // String to handle "9+" etc
  contact: {
    email: String,
    phone: String,
    location: String,
    socials: [{
      name: String,
      url: String,
      icon: String // Stored as name like "Github"
    }]
  }
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
