const express = require('express');
const { categories } = require('./db');
const bodyParser = require('body-parser')
const app = express()
const PORT = 3001;

app.use(bodyParser.json())
app.use(express.static('public'))

app.post('/api/create', (req, res) => {
    const newCategory = req.body;
    if (newCategory) {
        categories.push(newCategory)
        res.status(201).json({category: newCategory})
    } else {
        res.status(400).send()
    }
    
    
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

