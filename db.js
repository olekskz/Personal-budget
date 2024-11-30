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


const getCategories = (request, response) => {
    pool.query('select * from categories;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createCategory = async (req, res) => {
    const {category_name, category_value} = req.body
    try {
        const result = await pool.query('insert into categories (category_name, category_value) values ($1, $2) returning *', [category_name, category_value])
        res.status(200).json(result.rows[0]);
    } catch {
        console.error(err);
        res.status(500).send('Error')
    }        
}

module.exports = {
    getCategories,
    createCategory
}