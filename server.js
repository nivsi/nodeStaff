//const fs = require('fs');
import fs from 'fs'
//const express = require('express');
import express from 'express'
//const utils = require('./utils.js');
import utils from './utils.js';


const port =  process.env.PORT || 8080;
const app = express();
app.use(express.json());

app.get('/allProducts', (req, res) => {
    try
    {
        utils.checkExistFile("products.txt")

        const data = fs.readFileSync('./products.txt',"utf8");
        if(data.length === 0)
        {
            console.log('no products found');
            return res.status(400).json({error: 'Products not found'});
        }
        const products = JSON.parse(data);
        if(Array.isArray(products))
        {
            res.status(200).json(products);
        }
    }
    catch (err)
    {
        console.log(err);
        return res.status(500).json({error: 'server error'});
    }

})

app.put('/products/:productName',(req, res) => {
    const ProductName = req.params.productName;
    const {productPrice, productCount} = req.body;
    try
    {
        utils.checkValidProduct({ProductName ,productCount, productPrice}, 'AND');
        utils.checkExistFile("products.txt");
        const updateProduct = utils.updateProduct({ProductName , productPrice , productCount});
        res.status(200).json(updateProduct);

    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({err: err.message});
    }

})

app.post('/addProduct', (req, res) => {
    const {productName, productCount, productPrice} = req.body;
    try
    {
        utils.checkValidProduct({productName, productCount, productPrice}, 'OR');

        utils.checkExistFile("products.txt")


        utils.addNewProduct({"name":productName, "quantity": productCount,"price": productPrice});
        return res.status(201).json({"message": "Product added successfully"});
    }
    catch (err)
    {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
})


app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
})