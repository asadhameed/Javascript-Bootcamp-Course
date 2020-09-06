const userRepo = require('../../repositories/users');
const { check } = require('express-validator')
module.exports = {
    requiredEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Enter a valid email for example test@test.com')
        .custom(async (email) => {
            const existaenceUser = await userRepo.getOneBy({ email });
            if (existaenceUser) {
                throw new Error('Email in used')
            }
            console.log(` the email ${email}`)
        }),

    requiredPassword: check('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 to 20 charcters'),

    requiredPasswordConfirmation: check('passwordConfirmation')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 to 20 charcters')
        .custom((passwordConfirmation,{req})=>{
            if(passwordConfirmation !== req.body.password){
                throw new Error('Password must be match')
            }
           // console.log(` the email ${email}`)
            return true;
        }),

    requiredEmailExists: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Enter a valid email for example test@test.com')
        .custom(async email => {
            const userLogin = await userRepo.getOneBy({ email });
            if (!userLogin) {
                throw new Error('Email is not found');
            }
        }),

    requiredValidPasswordForUser: check('password')
        .trim()
        .custom(async (password, { req }) => {
            const userLogin = await userRepo.getOneBy({ email: req.body.email });
            if (!userLogin) {
                throw new Error('Password is invalid');
            }
            const validPassword = await userRepo.comparePassword(userLogin.password, password);
            if (!validPassword) {
                throw new Error('Password is invalid');
            }
        })

}