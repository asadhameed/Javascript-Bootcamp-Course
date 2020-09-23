module.exports.getCustomerSync= function (customerId) {
    console.log('Reading a customer from MongoDb...')
    return {id:1,  points:11};
}


module.exports.getCustomer=function (customerId) {
    return new Promise((resolve, reject)=>{
        console.log('Reading a customer from MongoDb...')
        resolve({id:id,  points:11});
    })
    
    
}