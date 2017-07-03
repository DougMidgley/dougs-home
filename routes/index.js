var router = require('express').Router();

router.use('/api', require('./api.js'));
router.use('/graph', require('./graph.js'));

module.exports = router;