import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Added password field
  verified: { type: Boolean, default: false },
  coordinates: { 
    latitude: { type: Number, required: false }, 
    longitude: { type: Number, required: false } 
  }
});

const Seller = mongoose.model('Seller', sellerSchema);
export default Seller;

