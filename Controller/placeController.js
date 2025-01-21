import mongoose from "mongoose";

import Place from "../Models/place.model.js";



export const addPalace = async (req, res) => {
  try {
    const {
      name,
      description,
      location_id,
      category_id,
      tags,
      video,
      latitude,
      longitude,
      contact_info,
      opening_hours,
    } = req.body;
    
    const fullUrl = `${req.protocol}://${req.get("host")}`;
    const picturePaths = req.files
      ? req.files.map((file) => `${fullUrl}/uploads/${file.filename}`)
      : [];
      

    const newPalace = new Place({
      name,
      description,
      location_id,
      category_id,
      tags,
      pictures: picturePaths,
      video,
      latitude,
      longitude,
    
contact_info : contact_info|| {},
 opening_hours : opening_hours|| []

    });

    await newPalace.save();

    res.status(200).json({data:newPalace,message:"Places created sucessfully"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getPlaces = async (req, res) => {
  try {
    const palace = await Place.find();
    res.json(palace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updatePlace = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const {
      name,
      description,
      location_id,
      category_id,
      tags,
      video,
      latitude,
      longitude,
      contact_info,
      opening_hours,
    } = req.body;

    const fullUrl = `${req.protocol}://${req.get("host")}`;
    const picturePaths = req.files?.map((file) => `${fullUrl}/uploads/${file.filename}`) || [];

    const updates = {
      name,
      description,
      location_id,
      category_id,
      tags,
      pictures: picturePaths,
      video,
      latitude,
      longitude,
      contact_info,
      opening_hours,
    };

    Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);
    const updatedPlace = await Place.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedPlace) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.status(200).json({ data: updatedPlace, message: "Place updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



export const getpalaceById = async (req, res) => {
  try {
    const palaceId = req.params.id;

    const palace = await Place.findById(palaceId);
    res.status(200).json(palace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletepalaceById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID Format" });
  }

  try {
    const deletepalace = await Place.findByIdAndDelete(id);

    if (!deletepalace) {
      return res.status(404).json({ message: "palace not found" });
    }

    res.status(200).json({ message: "palace deleted sucessfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
