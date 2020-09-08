const express = require('express');
const multer =require('multer');
const upload =multer({storage: multer.memoryStorage()});
const router = express.Router();
const productRepo= require('../../repositories/products');
const {requiredTitle,requirePrice} = require('./validation');
const productsLayout= require('../../views/admin/product/index');
const newProductLayout = require('../../views/admin/product/new');
const productEditLayout = require('../../views/admin/product/edit')
const {handleErrors,requireAut}=require('./middleware');


router.get('/admin/products',requireAut, async (req, res)=>{
   
    const products = await productRepo.getAll();
    res.send(productsLayout({products}));
});

router.get('/admin/products/new',requireAut, (req, res)=>{
  
    res.send(newProductLayout({}))
});

router.post('/admin/products/new',
            requireAut,
            upload.single('image'),
            [requiredTitle,requirePrice],
            handleErrors(newProductLayout), async (req, res)=>{
    
    // const image = req.file.buffer.toString('base64');
     const {title, price} = req.body;
     await productRepo.create({title, price});

  
    res.redirect('/admin/products')

});

router.get('/admin/products/:id/edit',requireAut, async (req, res)=>{
    const product= await productRepo.getOne(req.params.id);
    res.send(productEditLayout({product}))
})

router.post('/admin/products/:id/edit',
    requireAut,
    upload.single('image'),
    [requiredTitle,requirePrice],
    handleErrors(productEditLayout , async req=>{
        const product= await productRepo.getOne(req.params.id);
        return { product };
    } ), async (req, res)=>{
        const changes=req.body;
        if(req.file){
            changes.file= req.file.buffer.toString('base64');
        }
        try{
            await productRepo.update(req.params.id,changes);
        }catch(error){
            return res.send("item is not found")
        }
        res.redirect('/admin/products')
})


router.post('/admin/products/:id/delete', requireAut,async(req, res)=>{
    console.log('Deleteing the product')
     await productRepo.delete(req.params.id);
     res.redirect('/admin/products')

})

module.exports= router;