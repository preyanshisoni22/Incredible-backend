import express from "express";
import upload from "../upload.js";

import {addPalace, deletepalaceById, getpalaceById, getPlaces, updatePlace } from "../Controller/placeController.js";
const router = express.Router();


router.post('/', upload.array('pictures', 10), addPalace);
router.get('/', getPlaces);
// router.put('/:id', updatePlace); 
router.put('/:id', upload.array('pictures', 10), updatePlace); 

router.get('/:id',getpalaceById);
router.delete('/:id',deletepalaceById);




export default router;
