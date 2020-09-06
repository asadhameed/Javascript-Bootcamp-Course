 
const fs =require('fs');
const crypto =require('crypto');
const util =require('util');
const scrypt=util.promisify(crypto.scrypt);
class UsersRepository{
  
  
      constructor(fileName){
        if(!fileName){
            throw new Error('Create a repository requires a file');
        }
      
        this.fileName=fileName;
        try{
            
            fs.accessSync(this.fileName)
        }catch(err){
            console.log(`${fileName} ${err ? 'does not exist' : 'exists'}`);
            fs.writeFileSync(this.fileName,'[]');
        }
    }

   async getAll(){
        return  JSON.parse(await fs.promises.readFile(this.fileName,{encoding:'utf8'}));
    }

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

    async writeAll(records){    
        await fs.promises.writeFile(this.fileName, JSON.stringify(records,null, 2));
    }

     randomID(){
       return crypto.randomBytes(4).toString('hex');

    }

    async getOne(id){
        const records = await this.getAll();
       return  records.find(record => record.id===id);
    }

    async delete(id){
        const records = await this.getAll(); 
       const fliterRecords= records.filter(record=> record.id !==id);
       await this.writeAll(fliterRecords)
    }

    async update(id, attrs){
        const records = await this.getAll();
       const record= records.find(record => record.id===id);
        if(!record){
            throw new Error(`Record with id ${id} is not found `)
        }
        Object.assign(record, attrs);
        await this.writeAll(records);
    }

    async getOneBy(filter){
        const records = await this.getAll();
        for(let record of records){
            let found  =true;
                for(let key in filter){
                    if(filter[key]!==record[key]){
                        found =false;
                    }
                }
                if(found){
                    return record;
                }
            
        }
    }

}

module.exports = new UsersRepository('./repositories/users.json');
