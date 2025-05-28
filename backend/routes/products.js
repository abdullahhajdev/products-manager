const express = require('express');
const router = express.Router();
const pool = require('../db');


const isAdmin = (req, res, next) => {
    if (req.query.role === 'admin') {
        next();
    }else{
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
}


router.get('/', async (req, res) => {
    try{
        const {rows} = await pool.query(`SELECT * FROM products`);
        res.status(200).json(rows);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
);

router.post('/', async (req,res) => {
    const {name, description, price} = req.body;
    if(!name || !description || !price) {
        return res.status(400).json({message: `All fields are required`})
    }
    try{
        const result = await pool.query(
            `INSERT INTO products (name, description, price) VALUES ($1,$2,$3) RETURNING *`,
            [name, description, price]
        );
        res.status(201).json(result.rows[0]);
    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' }); 
    }
})


router.put('/:id', isAdmin, async (req,res) => {
    const {id} = req.params;
    const {name, description, price} = req.body;
    try{
        const result = await pool.query(
            `UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *`,
            [name, description, price, id]
        );
        if (result.rows.length === 0){
            return res.status(404).json({message: `Product with id ${id} not found`});
        }
        res.status(200).json(result.rows[0]);
    }catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
      
})


router.delete('/:id', isAdmin, async(req,res) => {
    const {id} = req.params;
    try{
        const result = await pool.query(
            `DELETE FROM products WHERE id = $1 RETURNING *`,
            [id]
        )
        if(result.rows.length === 0) {
            res.status(404).json({message: `Product with id ${id} not found`})
;        }
    }catch(err) {
        console.log(err);
        res.status(500).json({message:`Internal server error`})
        
    }
})


module.exports = router;
// This code defines an Express router for managing products in a database.
// It includes routes for getting all products, adding a new product, updating an existing product, and deleting a product.
// The `isAdmin` middleware checks if the user has admin privileges before allowing certain actions.
// The code uses PostgreSQL for database operations and handles errors appropriately.