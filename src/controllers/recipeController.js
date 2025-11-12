import { getDb } from "../config/database.js";

export async function getAllRecipes(req, res) {
    try {
        const db = await getDb();
        const recipes = await db.all(
            "SELECT * FROM recipes"
        )
        res.json({ data: recipes});
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

export async function getRecipeById(req, res) {
    try {
        const db = await getDb();
        const recipe = await db.get("SELECT * FROM recipes WHERE id = ?", [req.params.id]);

        if(!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json({ data: recipe })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function createRecipe(req, res) {
    try {
        const {title, preparation_time, difficulty, budget, description} = req.body;

        if(!title) {
            return res.status(400).json({error: 'Le titre est requis'});
        }

        const db = await getDb();
        const result = await db.run(
            "INSERT INTO recipes (title, preparation_time, difficulty, budget, description) VALUES (?, ?, ?, ?, ?)",
            [title, preparation_time, difficulty, budget, description]
        );

        const recipe = await db.get("SELECT * FROM recipes WHERE id = ?", [result.lastID]);

        res.status(201).json({ data: recipe });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}