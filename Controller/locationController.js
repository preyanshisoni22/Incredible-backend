import mongoose from "mongoose";
import Location from "../Models/location.model.js";

export const addLocation = async (req, res) => {
  try {
    const { name, favorite, most_visited, parent_id } = req.body;
    let picturePath = "";

    if (req.file) {
      const fullUrl = `${req.protocol}://${req.get("host")}`;
      picturePath = `${fullUrl}/uploads/${req.file.filename}`;
    }

    const normalizedParentId =
      parent_id === "null" || parent_id === "" ? null : parent_id;

    const newLocation = new Location({
      name,
      favorite,
      most_visited,
      parent_id: normalizedParentId,
      picture: picturePath,
    });

    const savedLocation = await newLocation.save();

    res.status(201).json({
      ...savedLocation.toObject(),
      id: savedLocation._id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLocation = async (req, res) => {
  
  const { id } = req.params;
  const { name, favorite, most_visited, parent_id } = req.body;
  let picturePath = req.body.picture || "";

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    if (req.file) {
      const fullUrl = `${req.protocol}://${req.get("host")}`;
      picturePath = `${fullUrl}/uploads/${req.file.filename}`;
    }

    const normalizedParentId =
      parent_id === "null" || parent_id === "" ? null : parent_id;

    const updates = {
      name,
      favorite,
      most_visited,
      parent_id: normalizedParentId,
      picture: picturePath,
    };

    const updatedLocation = await Location.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({
      data: updatedLocation,
      message: "Location updated successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getLocationById = async (req, res) => {
  
  try {
    const locationId = req.params.id;

    const location = await Location.findById(locationId);
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID Format" });
  }

  try {
    const deletedLocation = await Location.findByIdAndDelete(id);

    if (!deletedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({ message: "Location deleted sucessfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const deleteMany = async (req, res) => {
// console.log("Hello");
//   try {
//     const { ids } = req.body; 

//     if (!Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({ message: "Invalid or missing IDs array" });
//     }

    
//     const areIdsValid = ids.every((id) => mongoose.Types.ObjectId.isValid(id));
//     if (!areIdsValid) {
//       return res.status(400).json({ message: "One or more IDs are invalid" });
//     }

//     // Perform bulk deletion
//     const result = await Location.deleteMany({ _id: { $in: ids } });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: "No locations found for the provided IDs" });
//     }

//     res.status(200).json({
//       message: "Locations deleted successfully",
//       deletedCount: result.deletedCount,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


export const deleteMany = async (req, res) => {
  
  try {
    const { ids } = req.body;

    // Ensure the ids are valid MongoDB ObjectIds
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid or missing IDs array" });
    }

    // Validate that each id is a valid ObjectId
    const areIdsValid = ids.every((id) => mongoose.Types.ObjectId.isValid(id));
    if (!areIdsValid) {
      return res.status(400).json({ message: "One or more IDs are invalid" });
    }

    // Perform bulk deletion using the ids directly
    const result = await Location.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No locations found for the provided IDs" });
    }

    res.status(200).json({
      message: "Locations deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
