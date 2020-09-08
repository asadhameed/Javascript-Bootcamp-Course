const express =require('express');
const app =express();
const bodyParse=require('body-parser');
const cookieSession= require('cookie-session');
const authRouter=require('./router/admin/auth');
const adminProductRouter= require('./router/admin/products') 
const customerProductRouter=require('./router/customer/products')
const cartsRouter = require('./router/customer/carts')
const { static } = require('express');
app.use(express.static('public'))
app.use(bodyParse.urlencoded({extended:true}))
app.use(cookieSession({
    keys:['werniwerk3e3rnkwerwreere']
})
);

app.use(authRouter);
app.use(adminProductRouter);
app.use(customerProductRouter);
app.use(cartsRouter)

app.listen(3000,()=>{
    console.log('Listening');
});
