const express = require('express')
require('dotenv').config()


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())


app.get('/', async (req,res) => {
    res.send(`Welcome to products management API!`)
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})