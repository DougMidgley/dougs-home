var router = require('express').Router();

router.use('/weather', require('./weather.js'));
router.use('/api', require('./api.js'));

module.exports = router;