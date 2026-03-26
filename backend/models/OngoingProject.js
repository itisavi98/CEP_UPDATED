// ============================================================
//  models/OngoingProject.js
//  Schema for projects currently under construction.
// ============================================================

import mongoose from 'mongoose';

const ongoingProjectSchema = new mongoose.Schema(
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
    possession: {
      type: String,
      required: [true, 'Possession date is required'],
      trim: true,
    },
    rera: {
      type: String,
      required: [true, 'RERA number is required'],
      trim: true,
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      default: 'Under Construction',
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
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

const OngoingProject = mongoose.model('OngoingProject', ongoingProjectSchema);
export default OngoingProject;