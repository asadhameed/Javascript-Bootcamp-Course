
const repository = require('./repository');
class productsRepo extends repository{
   
}
module.exports = new productsRepo('./repositories/database/products.json');
