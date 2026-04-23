import express from 'express';
import { authenticateToken } from '../middleware/auth';
import Profile from '../models/Profile';
import Project from '../models/Project';
import Skill from '../models/Skill';
import Service from '../models/Service';

const router = express.Router();

// Public: Get all portfolio data
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    const projects = await Project.find().sort('order');
    const skills = await Skill.find().sort('order');
    const services = await Service.find().sort('order');
    
    res.json({
      profile,
      projects,
      skills,
      services
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected: Update Profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected: Projects CRUD
router.post('/projects', authenticateToken, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/projects/:id', authenticateToken, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected: Skills CRUD
router.post('/skills', authenticateToken, async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/skills/:id', authenticateToken, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/skills/:id', authenticateToken, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected: Services CRUD
router.post('/services', authenticateToken, async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/services/:id', authenticateToken, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/services/:id', authenticateToken, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
