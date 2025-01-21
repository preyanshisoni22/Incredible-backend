import mongoose from "mongoose";


export const PlaceImageSchema = new mongoose.Schema({
  picture: { type: [String], required: true },
  place_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  title:{type : String, required:true},
  activate:{type:Boolean,default:false}
}, { timestamps: true });

const Palace = mongoose.model('PlaceImage',PlaceSchema);
export default Palace;



