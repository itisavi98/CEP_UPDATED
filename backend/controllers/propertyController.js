// ============================================================
//  controllers/propertyController.js
//  All business logic for property listings.
//  Categories: Residential (sale/resale) | Commercial (sale/rent) | Plots
// ============================================================

import Property from '../models/Property.js';

// ── GET /api/properties  — Public (Admin uses this too) ──
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    console.error('getAllProperties error:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

// ── GET /api/properties/:category/:type?  — Public ───────────
// :category = Residential | Commercial | Plots
// :type     = sale | resale | rent  (optional)
export const getPropertiesByCategoryAndType = async (req, res) => {
  try {
    const { category, type } = req.params;

    const filter = { category };
    if (type) filter.type = type;

    const properties = await Property.find(filter).sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    console.error('getPropertiesByCategoryAndType error:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

// ── POST /api/properties  — Admin ───────────────────────────
export const createProperty = async (req, res) => {
  try {
    const {
      title, location, category, type, price,
      area, description, image, amenities, map_url,
    } = req.body;

    const property = await Property.create({
      title,
      location,
      category,
      type: type || null,
      price,
      area: area || null,
      description: description || null,
      image,
      amenities: amenities || [],
      map_url: map_url || null,
    });

    res.status(201).json(property);
  } catch (error) {
    console.error('createProperty error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to create property' });
  }
};

// ── PUT /api/properties/:id  — Admin ────────────────────────
export const updateProperty = async (req, res) => {
  try {
    const {
      title, location, category, type, price,
      area, description, image, amenities, map_url,
    } = req.body;

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        title, location, category,
        type: type || null,
        price,
        area: area || null,
        description: description || null,
        image,
        amenities: amenities || [],
        map_url: map_url || null,
      },
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error('updateProperty error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to update property' });
  }
};

// ── DELETE /api/properties/:id  — Admin ─────────────────────
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('deleteProperty error:', error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
};