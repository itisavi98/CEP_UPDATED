// ============================================================
//  controllers/projectController.js
//  All business logic for:
//    - Ongoing projects  (CRUD)
//    - Completed projects (CRUD)
//    - Mark ongoing → completed  (the "complete" workflow)
//    - Undo complete → back to ongoing
// ============================================================

import OngoingProject from '../models/OngoingProject.js';
import CompletedProject from '../models/Completedprojects.js';

// ════════════════════════════════════════════════════════════
//  ONGOING PROJECTS
// ════════════════════════════════════════════════════════════

// GET /api/ongoing-projects  — Public
export const getOngoingProjects = async (req, res) => {
  try {
    const projects = await OngoingProject.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('getOngoingProjects error:', error);
    res.status(500).json({ error: 'Failed to fetch ongoing projects' });
  }
};

// POST /api/ongoing-projects  — Admin
export const createOngoingProject = async (req, res) => {
  try {
    const { title, location, possession, rera, status, image, map_url } = req.body;

    const project = await OngoingProject.create({
      title,
      location,
      possession,
      rera,
      status: status || 'Under Construction',
      image,
      map_url: map_url || null,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('createOngoingProject error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to create ongoing project' });
  }
};

// PUT /api/ongoing-projects/:id  — Admin
export const updateOngoingProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, possession, rera, status, image, map_url } = req.body;

    const project = await OngoingProject.findByIdAndUpdate(
      id,
      { title, location, possession, rera, status, image, map_url: map_url || null },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Ongoing project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('updateOngoingProject error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to update ongoing project' });
  }
};

// DELETE /api/ongoing-projects/:id  — Admin
export const deleteOngoingProject = async (req, res) => {
  try {
    const project = await OngoingProject.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Ongoing project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('deleteOngoingProject error:', error);
    res.status(500).json({ error: 'Failed to delete ongoing project' });
  }
};

// ════════════════════════════════════════════════════════════
//  COMPLETED PROJECTS
// ════════════════════════════════════════════════════════════

// GET /api/completed-projects  — Public
export const getCompletedProjects = async (req, res) => {
  try {
    const projects = await CompletedProject.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('getCompletedProjects error:', error);
    res.status(500).json({ error: 'Failed to fetch completed projects' });
  }
};

// POST /api/completed-projects  — Admin
export const createCompletedProject = async (req, res) => {
  try {
    const { title, location, year, image, description, map_url } = req.body;

    const project = await CompletedProject.create({
      title,
      location,
      year,
      image,
      description,
      map_url: map_url || null,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('createCompletedProject error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to create completed project' });
  }
};

// PUT /api/completed-projects/:id  — Admin
export const updateCompletedProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, year, image, description, map_url } = req.body;

    const project = await CompletedProject.findByIdAndUpdate(
      id,
      { title, location, year, image, description, map_url: map_url || null },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Completed project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('updateCompletedProject error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to update completed project' });
  }
};

// DELETE /api/completed-projects/:id  — Admin
export const deleteCompletedProject = async (req, res) => {
  try {
    const project = await CompletedProject.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Completed project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('deleteCompletedProject error:', error);
    res.status(500).json({ error: 'Failed to delete completed project' });
  }
};

// ════════════════════════════════════════════════════════════
//  WORKFLOW: Mark Ongoing → Completed
// ════════════════════════════════════════════════════════════

// POST /api/projects/mark-complete/:id  — Admin
// Atomically moves a project from ongoing to completed.
export const markProjectComplete = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, description } = req.body;

    // Step 1 — Fetch the ongoing project
    const ongoingProject = await OngoingProject.findById(id);
    if (!ongoingProject) {
      return res.status(404).json({ error: 'Ongoing project not found' });
    }

    // Step 2 — Insert into completed_projects
    const completedProject = await CompletedProject.create({
      title: ongoingProject.title,
      location: ongoingProject.location,
      year: year || String(new Date().getFullYear()),
      image: ongoingProject.image,
      description: description || ongoingProject.status,
      map_url: ongoingProject.map_url,
    });

    // Step 3 — Remove from ongoing_projects
    await OngoingProject.findByIdAndDelete(id);

    res.json({
      message: 'Project moved to completed successfully',
      completedProject,
    });
  } catch (error) {
    console.error('markProjectComplete error:', error);
    res.status(500).json({ error: error.message || 'Failed to mark project as complete' });
  }
};

// ════════════════════════════════════════════════════════════
//  WORKFLOW: Undo Complete → Back to Ongoing
// ════════════════════════════════════════════════════════════

// POST /api/projects/undo-complete/:id  — Admin
export const undoMarkComplete = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1 — Fetch the completed project
    const completedProject = await CompletedProject.findById(id);
    if (!completedProject) {
      return res.status(404).json({ error: 'Completed project not found' });
    }

    // Step 2 — Re-insert into ongoing_projects
    const ongoingProject = await OngoingProject.create({
      title: completedProject.title,
      location: completedProject.location,
      possession: 'To be confirmed',
      rera: 'N/A',
      status: completedProject.description || 'Ongoing',
      image: completedProject.image,
      map_url: completedProject.map_url,
    });

    // Step 3 — Remove from completed_projects
    await CompletedProject.findByIdAndDelete(id);

    res.json({
      message: 'Project moved back to ongoing successfully',
      ongoingProject,
    });
  } catch (error) {
    console.error('undoMarkComplete error:', error);
    res.status(500).json({ error: error.message || 'Failed to undo completion' });
  }
};