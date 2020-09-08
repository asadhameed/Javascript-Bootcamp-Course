const repository = require('./repository');

class carts extends repository{

}

module.exports = new carts('./repositories/database/carts.json')