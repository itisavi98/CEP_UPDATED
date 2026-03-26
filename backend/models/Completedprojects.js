// ============================================================
//  models/CompletedProject.js
//  Schema for delivered / finished projects.
// ============================================================

import mongoose from 'mongoose';

const completedProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    year: {
      type: String,
      required: [true, 'Completion year is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    map_url: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const CompletedProject = mongoose.model('CompletedProject', completedProjectSchema);
export default CompletedProject;