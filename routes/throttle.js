var express = require('express');
var router = express.Router();
var Limiter = require('express-rate-limiter');
var MemoryStore = require('express-rate-limiter/lib/memoryStore');
var limiter = new Limiter({ db: new MemoryStore() });

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Express RESTful API');
});

router.post('/', limiter.middleware({ outerTimeLimit: 2 * 60 * 1000, outerLimit: 5, headers: false }), function (req, res) {
    res.send('Express RESTful API');
});

module.exports = router;