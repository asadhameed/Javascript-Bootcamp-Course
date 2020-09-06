const express =require('express');
const app =express();
const bodyParse=require('body-parser');
const cookieSession= require('cookie-session');
const router=require('./router/admin/auth');
const { static } = require('express');
app.use(express.static('public'))
app.use(bodyParse.urlencoded({extended:true}))
app.use(cookieSession({
    keys:['werniwerk3e3rnkwerwreere']
})
);

app.use(router);

app.listen(3000,()=>{
    console.log('Listening');
});
