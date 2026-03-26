// ============================================================
//  models/Client.js
//  Schema for client companies / testimonials shown on
//  the public-facing "Our Clients" section.
// ============================================================

import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    logo: {
      type: String,
      required: [true, 'Logo URL is required'],
    },
    type: {
      type: String,
      default: null,
      trim: true,
    },
    testimonial: {
      type: String,
      default: null,
      trim: true,
    },
    project: {
      type: String,
      default: null,
      trim: true,
    },
    years_with_us: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model('Client', clientSchema);
export default Client;