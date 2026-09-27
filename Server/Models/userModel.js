import mongoose from "mongoose";

const userschema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 15,
   required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    // select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  address: [
    {
      fullName: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
      phone: String,
    },
  ],

  avatar: {
    public_id: String,
    url: String,
  },
  token :[{
    // type : String,
  }],
  createAt: {
    type: Date,
    default: Date.now,
  },
},
{ timestamps: true });

const user = mongoose.model("UserDetails", userschema);

export default user
