// ============================================================
//  models/Property.js
//  Schema for all property listings:
//  Residential (sale / resale), Commercial (sale / rent),
//  and Plotting.
// ============================================================

import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
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
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Residential', 'Commercial', 'Plots'],
        message: 'Category must be Residential, Commercial, or Plots',
      },
    },
    // sub-type within a category: sale | resale | rent
    type: {
      type: String,
      default: null,
      trim: true,
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
      trim: true,
    },
    area: {
      type: String,
      default: null,
      trim: true,
    },
    description: {
      type: String,
      default: null,
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    amenities: {
      type: [String],
      default: [],
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

// Index for frequent query pattern
propertySchema.index({ category: 1, type: 1 });

const Property = mongoose.model('Property', propertySchema);
export default Property;