const db= require('./db')
const mail= require('./mail')
module.exports.absolute= function (number) {
    if(number >0) return number;
    if(number< 0) return -number;
    return 0;
    
}

module.exports.greet=function (name) {
    return `welcome ${name} !`;
}

module.exports.getCurrencies= function () {
    return ['USD', 'AUD', 'EUR'];
}

 module.exports.getProduct=function () {
     return {id:1, price:20, category:'a'}
 }

 module.exports.registerUser=function (username) {
     if(!username) throw new Error('UserName is required');
     return {id: new Date().getTime(), name:username}
     
 }

 module.exports.applyDiscount=function (order) {
     const customer = db.getCustomerSync(order.customerID);
     if(customer.points > 10){
         order.totalPrice *= 0.9;
     }
     
 }

 module.exports.notifyCustomer= function (order) {
    const customer = db.getCustomerSync(order.customerID);
    mail.send(customer.mail, 'your order was placed successfully')
     
 }