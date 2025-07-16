import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", 
  },
  items: [
    {
      name: { type: String, required: true },
      image: { type: String },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  stripeSessionId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending', // can be 'paid', 'cancelled', etc.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
