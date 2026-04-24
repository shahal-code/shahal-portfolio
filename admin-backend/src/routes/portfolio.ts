import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Service from '../models/Service.js';

const router = express.Router();

// Public: Get all portfolio data
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    const projects = await Project.find().sort('order');
    const skills = await Skill.find().sort('order');
    const services = await Service.find().sort('order');
    
    console.log(`[DEBUG] Fetching portfolio: ${skills.length} skills, ${projects.length} projects`);
    
    res.json({
      profile: profile || null,
      projects,
      skills,
      services
    });
  } catch (err) {
    console.error('[ERROR] Failed to fetch portfolio:', err);
    res.status(500).json({ message: 'Error fetching portfolio data' });
  }
});

// Protected: Update Profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    console.log('[DEBUG] Updating profile:', req.body);
    const profile = await Profile.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    res.json(profile);
  } catch (err) {
    console.error('[ERROR] Profile update failed:', err);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Protected: Projects CRUD
router.post('/projects', authenticateToken, async (req, res) => {
  try {
    const { title, image } = req.body;
    if (!title || !image) {
      return res.status(400).json({ message: 'Title and Image are required' });
    }
    
    console.log('[DEBUG] Creating project:', title);
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error('[ERROR] Project creation failed:', err);
    res.status(500).json({ message: 'Error creating project' });
  }
});

router.put('/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error updating project' });
  }
});

router.delete('/projects/:id', authenticateToken, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

// Protected: Skills CRUD
router.post('/skills', authenticateToken, async (req, res) => {
  try {
    const { name, category } = req.body;
    if (!name || !category) {
      return res.status(400).json({ message: 'Name and Category are required' });
    }

    console.log('[DEBUG] Adding skill:', name, 'to category:', category);
    const skill = new Skill(req.body);
    await skill.save();
    
    // Verify count after save
    const count = await Skill.countDocuments();
    console.log(`[DEBUG] Skill saved. Total skills in DB: ${count}`);
    
    res.status(201).json(skill);
  } catch (err) {
    console.error('[ERROR] Skill creation failed:', err);
    res.status(500).json({ message: 'Error adding skill' });
  }
});

router.put('/skills/:id', authenticateToken, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: 'Error updating skill' });
  }
});

router.delete('/skills/:id', authenticateToken, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting skill' });
  }
});

// Protected: Services CRUD
router.post('/services', authenticateToken, async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: 'Error adding service' });
  }
});

router.put('/services/:id', authenticateToken, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Error updating service' });
  }
});

router.delete('/services/:id', authenticateToken, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting service' });
  }
});

export default router;
