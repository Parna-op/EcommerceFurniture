// const mongoose = require('mongoose');
import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  // 1. User Link (Who placed the order?)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // 2. Order Items (Snapshot of products at time of purchase)
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true }, // Store price at time of purchase!
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      }
    }
  ],

  // 3. Shipping Information
  shippingAddress: {
    fullName: { type: String },
    address: { type: String },
    city: { type: String },
    postalCode: { type: String},
    country: { type: String},
    phone: { type: String}
  },
  // shippingAddress: {
  //   fullName: { type: String, required: true },
  //   address: { type: String, required: true },
  //   city: { type: String, required: true },
  //   postalCode: { type: String, required: true },
  //   country: { type: String, required: true },
  //   phone: { type: String, required: true }
  // },

  // 4. Payment Details
  paymentMethod: {
    type: String,
    required: true,
    default: 'Card' // or 'PayPal', 'Stripe'
  },
  paymentResult: { // Data returned from PayPal/Stripe
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String }
  },

  // 5. Order Math
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },

  // 6. Status Tracking
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  }

}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

export default  mongoose.model('Order', orderSchema);