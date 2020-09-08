 
const fs =require('fs');
const crypto =require('crypto');
const util =require('util');
const scrypt=util.promisify(crypto.scrypt);
const repository = require('./repository')
class UsersRepository extends repository{
  
    async createUser(attrs){
        attrs.id=this.randomID();
        const salt =crypto.randomBytes(8).toString('hex');
        const buff = await scrypt(attrs.password, salt,64);
        const record={
            ...attrs,
            password: `${buff.toString('hex')}.${salt}`
        }
        const records = await this.getAll();
        records.push(record);
        await this.writeAll(records);
        return attrs.id;

    }

    async comparePassword(savedPassword, suppliedPassword){
            const [hashed, salt] = savedPassword.split('.');
            const suppliedPasswordBuff = await scrypt(suppliedPassword, salt,64);
            return hashed===suppliedPasswordBuff.toString('hex');

    }

}

module.exports = new UsersRepository('./repositories/database/users.json');
