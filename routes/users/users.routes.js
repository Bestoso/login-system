const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    const users = await usersModel.find();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const user = await usersModel.findById(req.params.id);
    res.json(user);
});

router.post('/', async (req, res) => {
    const { username, password, email } = req.body;
    const user = new usersModel({
        username,
        password,
        email,
    });
    await user.save();
    res.json({
        message: 'User created',
        payload: user
    });
});

router.put('/:id', async (req, res) => {
    const { username, password, email } = req.body;
    const user = await usersModel.findByIdAndUpdate(req.params.id, {
        username,
        password,
        email,
    });
    res.json({
        message: 'User updated',
        payload: user
    });
});

router.delete('/:id', async (req, res) => {
    await usersModel.findByIdAndDelete(req.params.id);
    res.json({
        message: 'User deleted'
    });
});

module.exports = router;