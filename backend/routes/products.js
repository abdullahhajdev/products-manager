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