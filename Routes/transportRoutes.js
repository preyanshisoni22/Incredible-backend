import express from "express";


import {addtransport, deletetransportById, gettransport, gettransportById, updatetransport } from "../Controller/transportController.js";
const router = express.Router();

router.post('/', addtransport);
router.get('/', gettransport);
router.put('/:id', updatetransport); 
router.get('/:id',gettransportById);
router.delete('/:id',deletetransportById);




export default router;
