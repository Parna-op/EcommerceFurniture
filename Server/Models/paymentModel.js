import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    amount: {
      type: Number,
      required: true, // total amount paid
    },

    currency: {
      type: String,
      default: "INR",
    },

    paymentMethod: {
      type: String,
      enum: ["CARD", "UPI", "NET_BANKING", "COD", "WALLET"],
      required: true,
    },

    gateway: {
      type: String,
      enum: ["RAZORPAY", "STRIPE", "PAYPAL", "COD"],
      required: true,
    },

    transactionId: {
      type: String, // from payment gateway
      unique: true,
      sparse: true,
    },

    gatewayOrderId: {
      type: String, // razorpay_order_id / stripe_payment_intent
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
      default: "PENDING",
    },

    failureReason: {
      type: String,
    },

    paidAt: {
      type: Date,
    },

    refundedAt: {
      type: Date,
    },

    metadata: {
      type: Object,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
