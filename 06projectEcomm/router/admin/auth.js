const express = require('express');
const userRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const singinTemplate = require('../../views/admin/auth/signin');
const { check, validationResult } = require('express-validator');
const { requiredEmail, requiredPassword, requiredPasswordConfirmation, requiredEmailExists, requiredValidPasswordForUser } = require('./validation')
const router = express.Router();
router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req: req }));
});


router.post('/signup', [requiredEmail, requiredPassword, requiredPasswordConfirmation], async (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.send(signupTemplate({ req: req, errors }));
    }
    const { email, password } = req.body;

    const userid = await userRepo.createUser({ email, password })
    req.session.userID = userid;
    console.log('the user is', userid)
    console.log(req.session.userID);
    res.send(`The user created with email ${email}`);
});

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('you are logout')
});

router.get('/signin', (req, res) => {
    res.send(singinTemplate({}));
});

router.post('/signin', [requiredEmailExists, requiredValidPasswordForUser], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(singinTemplate({ errors }))
    }
    const { email, password } = req.body;
    const userLogin =await userRepo.getOneBy({email})
    req.session.userID = userLogin.id;
    res.send(` the user ${email} with id ${userLogin.id} is login`)

});

module.exports = router;