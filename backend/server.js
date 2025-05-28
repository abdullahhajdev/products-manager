const express = require('express')
require('dotenv').config()
const productsRouter = require('./routes/products')
const app = express()
const PORT = process.env.PORT || 3000




app.use(express.json())

app.use('/products', productsRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})