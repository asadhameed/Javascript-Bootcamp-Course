const express =require('express');
const cartsRepo = require('../../repositories/carts')
const productRepo= require('../../repositories/products')
const cartsShowLayout= require('../../views/customer/carts/show')
const router= express.Router();

router.post('/cart/products', async (req,res)=>{
    let carts;
    console.log(req.session.cartId)
    if(!req.session.cartId){
      carts=  await cartsRepo.create({items:[]})
      req.session.cartId=carts.id;
    }
    else{
        carts=  await cartsRepo.getOne(req.session.cartId);
    }

   const existingItem = carts.items.find(item=> item.id===req.body.productId);
   console.log(existingItem);
   if(existingItem){
        existingItem.quantity++;
   }else{
       carts.items.push({id:req.body.productId, quantity:1})
      
   }
   try{
       await cartsRepo.update(carts.id,carts)
   }catch(error){
       console.error(error)
       return res.send("there is some error")
   }
   
   res.redirect('/cart');
})

router.get('/cart', async (req, res)=>{
  
    
    if(!req.session.cartId){
   
        return res.redirect('/')
    }
    const carts = await cartsRepo.getOne(req.session.cartId)
    for(let item of carts.items )
    {
        const product = await productRepo.getOne(item.id);
        item.product= product;
    }
   
    res.send(cartsShowLayout({items:carts.items}))
})

router.post('/carts/products/delete', async(req, res)=>{
    
    if(!req.session.cartId){
        return res.redirect('/')
    }
    
    const {cartId}= req.session;
    const {itemId} = req.body;
    const cart = await cartsRepo.getOne(cartId);
    const items= cart.items.filter(item => item.id !== itemId);
     try {
     
         await cartsRepo.update(cartId,{items:items})
         
     } catch (error) {
        console.log(error)
        return res.send("there is some error") 
     }
      //  console.log(req.body.itemId)
     res.redirect('/cart');
})

module.exports = router;