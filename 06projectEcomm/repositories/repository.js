const fs =require('fs');
const crypto =require('crypto');
const { randomID, writeAll } = require('./users');
module.exports= class repository {
    
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

    async create(attrs){
        attrs.id = this.randomID();
        const records = await this.getAll();
        records.push(attrs);
        await  this.writeAll(records);
        return attrs;

    }

   async getAll(){
        return  JSON.parse(await fs.promises.readFile(this.fileName,{encoding:'utf8'}));
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