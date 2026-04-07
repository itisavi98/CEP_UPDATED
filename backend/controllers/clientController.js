// ============================================================
//  controllers/clientController.js
//  CRUD for client companies / testimonials.
// ============================================================

import Client from '../models/Client.js';

// GET /api/clients  — Public
export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    console.error('getAllClients error:', error);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
};

// POST /api/clients  — Admin
export const createClient = async (req, res) => {
  try {
    const { name, logo, type, testimonial, project, years_with_us, rating } = req.body;

    const client = await Client.create({
      name,
      logo,
      type: type || null,
      testimonial: testimonial || null,
      project: project || null,
      years_with_us: years_with_us || null,
      rating: rating || 5,
    });

    res.status(201).json(client);
  } catch (error) {
    console.error('createClient error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to create client' });
  }
};

// PUT /api/clients/:id  — Admin
export const updateClient = async (req, res) => {
  try {
    const { name, logo, type, testimonial, project, years_with_us, rating } = req.body;

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      {
        name, logo,
        type: type || null,
        testimonial: testimonial || null,
        project: project || null,
        years_with_us: years_with_us || null,
        rating: rating || 5,
      },
      { new: true, runValidators: true }
    );

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    console.error('updateClient error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to update client' });
  }
};

// DELETE /api/clients/:id  — Admin
export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('deleteClient error:', error);
    res.status(500).json({ error: 'Failed to delete client' });
  }
};