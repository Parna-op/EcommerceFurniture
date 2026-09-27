import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  user: {
    id: mongoose.Schema.Types.ObjectId,
    ref :"user",
    requied: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types,
        ref: "Product",
        required: true,
      },

      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },

      price: {
        type: Number,
        required: true, 
      },
    },
  ],
  TotalAmount: {
    type: Number,
    min: 0,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});


const cart = mongoose.model('cartIteams', cartSchema )
