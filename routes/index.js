var router = require('express').Router();

router.use('/weather', require('./weather.js'));

module.exports = router;