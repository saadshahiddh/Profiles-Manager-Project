var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/cover-letter', require('./cover-letter'));
router.use('/faq', require('./faq'));
router.use('/profile', require('./profile'));

module.exports = router;
