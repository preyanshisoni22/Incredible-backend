import mongoose from "mongoose";

const NearbyTransportSchema = new mongoose.Schema(
  {
    place_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
      required: true,
    },
    transport_type: {
      type: String,
      
      required: true,
    },
    transport_name: {
      type: String,
      required: true,
    },
    distance_km: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Transport = mongoose.model('Transport', NearbyTransportSchema);
export default Transport ;