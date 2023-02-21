const { Router } = require('express');
const isAuth = require('../../middlewares/index');
const usersModel = require('../../models/usersSchema');

const router = Router();

router.get('/dashboard', isAuth, (req, res) => {
    res.render('dashboard', { 
        title: 'Home'
    });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.get('*', (req, res) => {
    res.sendFile('404.html', { root: './public' });
})

module.exports = router;