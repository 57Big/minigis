const mongoose = require('mongoose');
const Location = require('../models/Location');

// GET /api/locations
exports.getLocations = async (req, res, next) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 }).limit(500);
    res.json({ success: true, count: locations.length, data: locations });
  } catch (err) {
    next(err);
  }
};

// GET /api/locations/:id
exports.getLocationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Noto‘g‘ri ID' });
    }
    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ success: false, message: 'Joy topilmadi' });
    }
    res.json({ success: true, data: location });
  } catch (err) {
    next(err);
  }
};

// POST /api/locations
exports.createLocation = async (req, res, next) => {
  try {
    const { name, latitude, longitude, note, label, aiAnalysis } = req.body;

    if (
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      Number.isNaN(latitude) ||
      Number.isNaN(longitude)
    ) {
      return res.status(400).json({
        success: false,
        message: 'latitude va longitude raqam bo‘lishi kerak',
      });
    }

    const location = await Location.create({
      name: (name && String(name).trim()) || 'Nomsiz joy',
      latitude,
      longitude,
      note: note ? String(note).trim() : '',
      label: label ? String(label).trim().slice(0, 60) : '',
      aiAnalysis: aiAnalysis && typeof aiAnalysis === 'object' ? aiAnalysis : null,
    });

    res.status(201).json({ success: true, data: location });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/locations/:id
exports.updateLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Noto‘g‘ri ID' });
    }

    const { name, label, note, aiAnalysis } = req.body || {};
    const update = {};
    if (typeof name === 'string') update.name = name.trim() || 'Nomsiz joy';
    if (typeof label === 'string') update.label = label.trim().slice(0, 60);
    if (typeof note === 'string') update.note = note.trim();
    if (aiAnalysis !== undefined) {
      update.aiAnalysis =
        aiAnalysis && typeof aiAnalysis === 'object' ? aiAnalysis : null;
    }

    const location = await Location.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    if (!location) {
      return res.status(404).json({ success: false, message: 'Joy topilmadi' });
    }
    res.json({ success: true, data: location });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/locations/:id
exports.deleteLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Noto‘g‘ri ID' });
    }
    const location = await Location.findByIdAndDelete(id);
    if (!location) {
      return res.status(404).json({ success: false, message: 'Joy topilmadi' });
    }
    res.json({ success: true, message: 'O‘chirildi', data: { id } });
  } catch (err) {
    next(err);
  }
};
