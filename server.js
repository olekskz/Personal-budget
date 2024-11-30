const express = require('express');
const bodyParser = require('body-parser');
const { createCategory } = require('./db');
const app = express()
const PORT = process.env.PORT || 3001;



app.use(bodyParser.json())
app.use(express.static('public'))

app.post('/create-category', createCategory)


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

