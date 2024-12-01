const express = require('express');
const bodyParser = require('body-parser');
const { createCategory, getCategories, getCategoryById, updateCategory } = require('./db');
const app = express()
const PORT = process.env.PORT || 3001;



app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/get-categories', getCategories)
app.post('/create-category', createCategory)
app.get('/get-categoryById/:id', getCategoryById)
app.put('/update-category', updateCategory)



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

