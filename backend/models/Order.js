const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  userPhone: {
    type: String,
    required: true
  },
  document: {
    filename: String,
    path: String,
    mimetype: String,
    size: Number
  },
  numberOfCopies: {
    type: Number,
    required: true,
    min: 1
  },
  paperSize: {
    type: String,
    enum: ['a4', 'a3', 'letter', 'legal'],
    default: 'a4'
  },
  printSide: {
    type: String,
    enum: ['single', 'double'],
    required: true
  },
  printColor: {
    type: String,
    enum: ['blackwhite', 'color'],
    required: true
  },
  binding: {
    type: String,
    enum: ['none', 'spiral', 'staple', 'tape'],
    default: 'none'
  },
  urgency: {
    type: String,
    enum: ['urgent', 'lunch', 'evening', 'normal'],
    default: 'normal'
  },
  additionalNotes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'online', 'pending'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  adminMessage: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Order', orderSchema);