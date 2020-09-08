const express =require('express');
const productRepo = require('../../repositories/products');
const customerProductLayout = require('../../views/customer/product/index')
router = express.Router();

router.get('/', async (req, res)=>{

    
    const products = await productRepo.getAll();
    res.send(customerProductLayout({products}));
})

module.exports= router;