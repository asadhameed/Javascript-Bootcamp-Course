const fs = require('fs');
const chalk = require('chalk')
const path = require('path');
const forbiddenDirs = ['node_modules']
const render =require('./render')
class Runner {
    constructor() {
        this.testFiles = [];
    }
    async runTests() {
        for (let file of this.testFiles) {
           // console.log(chalk.gray(`------ ${file.shortName}`))
            const beforeEachs = []
            global.render = render
            global.beforeEach = func => {
                beforeEachs.push(func);
            }
            global.it = async (des, func) => {
                beforeEachs.forEach(fn => fn())
                try {
                    await func();
                    console.log(chalk.green(`\tok ${des}`))
                } catch (er) {
                    console.log(chalk.red(`\tFailed ${des}`));
                    const message = er.message.replace(/\n/g, '\n\t\t')
                    console.log(chalk.red('\t', message));
                }
            }
            try {
                console.log(chalk.gray(`------ ${file.shortName}`))
                require(file.name)
            } catch (err) {

                console.log(chalk.red(err));
            }
        }
    }
    async collectFiles(targetPath) {

        const files = await fs.promises.readdir(targetPath);
        for (let file of files) {
            try {
                const filepath = path.join(targetPath, file)
                const status = await fs.promises.lstat(filepath);

                if (status.isFile() && filepath.includes('.test.js')) {
                    this.testFiles.push({ name: filepath, shortName: file });
                }
                else if (status.isDirectory() && !(forbiddenDirs.includes(file))) {
                    const childDir = await fs.promises.readdir(filepath);
                    files.push(...childDir.map((f) => path.join(file, f)))
                }


            } catch (error) {
                console.log('This is error',error)
            }


        }


    }
}

module.exports = Runner;