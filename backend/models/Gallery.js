// ============================================================
//  models/Gallery.js
//  Schema for gallery images shown in the public carousel.
// ============================================================

import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    src: {
      type: String,
      required: [true, 'Image source URL is required'],
    },
    alt: {
      type: String,
      required: [true, 'Alt text is required'],
      trim: true,
    },
    title: {
      type: String,
      default: null,
      trim: true,
    },
    description: {
      type: String,
      default: null,
      trim: true,
    },
    category: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;