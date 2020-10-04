require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 7000;

// Assets 
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})