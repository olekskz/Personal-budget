const { error } = require('console')
const { response } = require('express')
const { request } = require('http')

const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Personal budget',
    password: 'postgres',
    port: '5432',
})


const getCategories = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, category_name, category_value FROM categories');
        res.json(result.rows);
    } catch (error) {
        console.error('Error with fetching categories:', error);
        res.status(500).json({error: 'Internal server error'});
    }
};

const createCategory = async (req, res) => {
    const {category_name, category_value} = req.body
    try {
        const result = await pool.query('insert into categories (category_name, category_value) values ($1, $2) returning *', [category_name, category_value])
        res.status(200).json(result.rows[0]);
    } catch {
        console.error();
        res.status(500).send('Error')
    }        
}

const getCategoryById = async (req, res) => {
    const id = req.params.id; // З params, оскільки маршрут: /get-categoryById/:id

    try {
        const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json(result.rows[0]); // Повертаємо лише одну категорію
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updateCategory = async (req, res) => {
    const { id, category_name, category_value } = req.body; // Отримуємо дані з тіла запиту

    if (!id || !category_name || !category_value) {
        return res.status(400).json({ error: 'All fields (id, category_name, category_value) are required' });
    }

    try {
        // Виконання SQL запиту для оновлення категорії
        const result = await pool.query(
            'UPDATE categories SET category_name = $1, category_value = $2 WHERE id = $3 RETURNING *',
            [category_name, category_value, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Повертаємо оновлені дані
        res.status(200).json(result.rows[0]); // Повертаємо оновлену категорію
    } catch (error) {
        console.error('Error with updating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteCategory = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query('delete from categories where id = $1', [id])
        res.status(200).send('Category deleted');
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
}

module.exports = {
    getCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}