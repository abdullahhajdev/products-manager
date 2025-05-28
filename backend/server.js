const express = require('express')
require('dotenv').config()
const productsRouter = require('./routes/products')
const app = express()
const PORT = process.env.PORT || 3000
const authRouter = require('./routes/auth');




app.use(express.json())

app.use('/products', productsRouter)

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})