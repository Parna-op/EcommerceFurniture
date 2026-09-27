import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  // id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   // required: true,
  //   // unique: true,
  // },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
      required: true,
    min: 0,
  },
  stock :{
    type : Number,
    require : true
  },
  sales:{
    type: Number,
    min: 0,
  },
  description:{
    type :String
  },
  catagories :{
    type : String
  },
  count: {
    type: Number,
    min: 1,
  },
  url: {
    type: String,
    unique: true,
    //  require :true
  },
  public_id: {
    type: String,
    unique: true,
    // require :true
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: { type: String },
      rating: { type: Number },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

  const products= mongoose.model("PRODUCTS", productSchema);
  
export default products
