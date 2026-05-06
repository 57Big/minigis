const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Joy nomi majburiy'],
      trim: true,
      maxlength: 250,
    },
    latitude: {
      type: Number,
      required: [true, 'Latitude majburiy'],
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: [true, 'Longitude majburiy'],
      min: -180,
      max: 180,
    },
    note: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
    label: {
      type: String,
      trim: true,
      maxlength: 60,
      default: '',
    },
    aiAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true, minimize: false }
);

LocationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Location', LocationSchema);
