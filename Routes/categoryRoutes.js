import express from "express";

const router = express.Router();

import {addCategory, deleteCategoryById, getCategories, getCategoryById, updateCategories} from '../Controller/categoryController.js';



router.get('/', getCategories);
router.put('/:id',updateCategories); 
router.get('/:id',getCategoryById);
router.post('/', addCategory);
router.delete('/:id',deleteCategoryById);

export default router;
