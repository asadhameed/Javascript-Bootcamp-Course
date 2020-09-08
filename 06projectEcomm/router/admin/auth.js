const express = require('express');
const userRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const singinTemplate = require('../../views/admin/auth/signin');
const {handleErrors} = require('./middleware')
const { requiredEmail, requiredPassword, requiredPasswordConfirmation, requiredEmailExists, requiredValidPasswordForUser } = require('./validation')
const router = express.Router();
router.get('/signup', (req, res) => {
    res.send(signupTemplate({}));
});


router.post('/signup', [requiredEmail, requiredPassword, requiredPasswordConfirmation],handleErrors(signupTemplate), async (req, res) => {
    const { email, password } = req.body;

    const userid = await userRepo.createUser({ email, password })
    req.session.userID = userid;
    console.log('the user is', userid)
    console.log(req.session.userID);
    res.redirect('/admin/products');
});

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('you are logout')
});

router.get('/signin', (req, res) => {
    res.send(singinTemplate({}));
});

router.post('/signin', [requiredEmailExists, requiredValidPasswordForUser],handleErrors(singinTemplate), async (req, res) => {
    const { email, password } = req.body;
    const userLogin =await userRepo.getOneBy({email})
    req.session.userID = userLogin.id;
    res.redirect('/admin/products');
    //res.send(` the user ${email} with id ${userLogin.id} is login`)

});

module.exports = router;