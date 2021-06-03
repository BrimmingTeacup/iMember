var express = require('express');
var router = express.Router();

const { csrfProtection, asyncHandler } = require('./utils')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

router.get(`/home`, csrfProtection, asyncHandler(async(req,res) => {
  const id = req.params.id
  res.render('user-home', {
    title: 'Home',
    csrfToken: req.csrfToken()
  })
}))

module.exports = router;
