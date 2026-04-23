import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User';
import Profile from './models/Profile';
import Project from './models/Project';
import Skill from './models/Skill';
import Service from './models/Service';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Profile.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Service.deleteMany({});

    // Create Admin User (password is hashed automatically by User model pre-save hook)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin';

    await User.create({
      email: adminEmail,
      password: adminPassword  // pre-save hook will hash this
    });
    console.log('Admin user created successfully.');

    // Initial Profile Data
    await Profile.create({
      name: "Muhammed Shahal",
      role: "MERN Stack Developer & Tech Enthusiast",
      bio: "Currently immersed in an intensive, hands-on MERN Stack development program at BROTOTYPE, mastering full-stack technologies through practical projects.",
      about: {
        heading: "Building the Future",
        headingAccent: "with Clean Code",
        description: "I’m Shahal, a MERN stack developer focused on building modern, responsive web applications. I specialize in creating scalable, user-friendly solutions with clean code and thoughtful design, aiming to deliver impactful digital experiences.",
        summary: "Currently immersed in an intensive, hands-on MERN Stack development program at BROTOTYPE, mastering full-stack technologies through practical projects and collaborative learning."
      },
      experienceCount: "9+",
      contact: {
        email: "shahalwork14@gmail.com",
        phone: "+917510107241",
        location: "Kerala, India",
        socials: [
          { name: "GitHub", url: "https://github.com/shahal-gitei", icon: "Github" },
          { name: "LinkedIn", url: "https://www.linkedin.com/in/muhammed-shahal-059bb7348", icon: "Linkedin" },
          { name: "Twitter", url: "https://x.com/HeyyShahl_", icon: "Twitter" },
          { name: "Instagram", url: "https://www.instagram.com/sh_ahl__", icon: "Instagram" }
        ]
      }
    });

    // Initial Skills
    const initialSkills = [
      { name: "HTML", icon: "HTML", category: "Frontend" },
      { name: "CSS", icon: "CSS", category: "Frontend" },
      { name: "JavaScript", icon: "JS", category: "Frontend" },
      { name: "Node.js", icon: "Node", category: "Backend" },
      { name: "Express", icon: "Express", category: "Backend" },
      { name: "MongoDB", icon: "MongoDB", category: "Database" },
      { name: "Bootstrap", icon: "Bootstrap", category: "Styling" },
      { name: "VS Code", icon: "VSCode", category: "Tools" },
      { name: "Git", icon: "Git", category: "Tools" },
      { name: "C", icon: "C", category: "Backend" },
      { name: "Figma", icon: "Figma", category: "Design" },
      { name: "Tailwind", icon: "Tailwind", category: "Styling" },
      { name: "GitHub", icon: "GitHub", category: "Tools" },
      { name: "NoSQL", icon: "NoSQL", category: "Database" },
      { name: "Video Editing", icon: "VideoEditing", category: "Design" },
      { name: "React", icon: "React", category: "Frontend" },
      { name: "Linux", icon: "Linux", category: "Tools" },
      { name: "Lightroom", icon: "Lightroom", category: "Design" },
    ];
    await Skill.create(initialSkills);

    // Initial Projects
    const initialProjects = [
      {
        title: "Weather Checker",
        description: "A real-time weather application that delivers precise atmospheric data and forecasts focus on ease of use and visual clarity.",
        tags: ["JavaScript", "API Integration", "HTML", "CSS"],
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop&q=60",
        github: "https://github.com/shahal-code/wetherChecker",
        demo: "https://shahal-code.github.io/wetherChecker/"
      },
      {
        title: "Simple Calculator",
        description: "A sleek and responsive calculator application with a focus on smooth interactions and clean mathematical logic.",
        tags: ["JavaScript", "HTML", "CSS", "UI/UX"],
        image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&auto=format&fit=crop&q=60",
        github: "https://github.com/shahal-code/Calculator-App",
        demo: "https://shahal-code.github.io/Calculator-App/"
      },
      {
        title: "Minimalist Todo App",
        description: "A clean and intuitive task management application designed for productivity with a streamlined user interface and local storage persistence.",
        tags: ["JavaScript", "HTML", "CSS", "Responsive"],
        image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&auto=format&fit=crop&q=60",
        github: "https://github.com/shahal-code/Todo-App",
        demo: "https://shahal-code.github.io/Todo-App/"
      },
      {
        title: "Premium Cars Showcase",
        description: "A high-end automotive showcase website featuring a selection of luxury vehicles with a clean, modern aesthetic.",
        tags: ["HTML", "CSS", "UI/UX", "Responsible Design"],
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=60",
        github: "https://github.com/shahal-code/premium-cars",
        demo: "https://shahal-code.github.io/premium-cars/"
      },
      {
        title: "Login Session Management",
        description: "A secure login system featuring robust session management, developed to explore Node.js backend architecture and user authentication flows.",
        tags: ["Node.js", "Express", "EJS", "Authentication"],
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60",
        github: "https://github.com/shahal-code/login-session",
        demo: "#"
      },
      {
        title: "User Management System",
        description: "A robust administrative dashboard for managing user records, featuring secure data handling and an intuitive management interface.",
        tags: ["Node.js", "Express", "MongoDB", "Admin Panel"],
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60",
        github: "https://github.com/shahal-code/UserManagment-Project",
        demo: "#"
      }
    ];
    await Project.create(initialProjects);

    // Initial Services
    const initialServices = [
      {
        title: "Frontend Development",
        description: "Crafting beautiful and responsive user interfaces using HTML, CSS, Bootstrap, and React focusing on modern web standards.",
        icon: "Layout",
        color: "hsl(var(--primary))",
      },
      {
        title: "Backend Development",
        description: "Building server-side logic and managing databases with Node.js, Express, and MongoDB to create functional applications.",
        icon: "Server",
        color: "#10b981",
      },
      {
        title: "Video Editing",
        description: "Creating engaging visual content with smooth transitions and clean cuts for social media and personal branding.",
        icon: "Video",
        color: "#f59e0b",
      },
      {
        title: "MERN Stack Learning",
        description: "Successfully building full-stack applications as part of an intensive training program, mastering end-to-end development.",
        icon: "Code",
        color: "#3b82f6",
      },
    ];
    await Service.create(initialServices);

    console.log('Database seeded successfully.');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
