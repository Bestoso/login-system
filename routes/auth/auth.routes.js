const { Router } = require('express');
const bcrypt = require('bcrypt');
const usersModel = require('../../models/usersSchema');

const router = Router();

//auth routes 
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    const user = await usersModel.findOne({ email });
    if (user) return res.status(409).json({ message: 'User already exists' });

    const hassedPassword = await bcrypt.hash(password, 10);

    const newUser = new usersModel({
        username,
        password: hassedPassword,
        email,
    });

    await newUser.save();
    res.status(201).json({
        message: 'User created',
        payload: newUser
    });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await usersModel.findOne({ email });

    if (!user) return res.status(404).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(404).json({ message: 'Invalid credentials' });

    req.session.isLoggedIn = true;
    res.status(200).json({
        message: 'User logged in',
        payload: user
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
