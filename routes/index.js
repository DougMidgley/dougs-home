var router = require('express').Router();

router.use('/weather', require('./weather.js'));
router.use('/api', require('./api.js'));
router.use('/graph', require('./graph.js'));

module.exports = router;