const { Router } = require('express');

const router = Router();

router.use('/', require('./static/static.routes'));

module.exports = router;