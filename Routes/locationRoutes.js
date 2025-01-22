
import express from "express";
const router = express.Router();

import {getLocations, addLocation, getLocationById, updateLocation,deleteById, deleteMany} from '../Controller/locationController.js';
import upload from "../upload.js";


router.post('/', upload.single("picture"), addLocation);
router.get('/:id',getLocationById);
router.get('/', getLocations);
router.put('/:id', upload.single("picture"), updateLocation); 
router.delete('/',deleteMany);

router.delete('/:id',deleteById);

export default router;
