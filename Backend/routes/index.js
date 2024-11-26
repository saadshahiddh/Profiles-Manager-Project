var express = require('express');
const { tokenCheckerMiddleWare } = require('../services/authentication');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.use(tokenCheckerMiddleWare);

router.use('/cover-letter', require('./cover-letter'));
router.use('/faq', require('./faq'));
router.use('/profile', require('./profile'));
router.use('/user', require('./user'));

module.exports = router;
