const express = require('express');
const bodyParser = require('body-parser');
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory, getValues } = require('./db');
const app = express()
const PORT = process.env.PORT || 3001;



app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/get-categories', getCategories)
app.post('/create-category', createCategory)
app.get('/get-categoryById/:id', getCategoryById)
app.put('/update-category', updateCategory)
app.delete('/delete-category/:id', deleteCategory)



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

