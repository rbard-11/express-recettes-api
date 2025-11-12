import express from "express";
import { createRecipe, getAllRecipes, getRecipeById } from "../controllers/recipeController.js";

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);


router.post('/', createRecipe);

export default router;