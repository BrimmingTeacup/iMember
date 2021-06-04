var express = require('express');
const db = require('../db/models');
var router = express.Router();

const { csrfProtection, asyncHandler } = require('./utils')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

router.get(`/home`, csrfProtection, asyncHandler(async (req, res) => {
  const id = req.params.id
  const tasks = await db.Task.findAll({})
  const lists = await db.List.findOne({})
  // console.log('IS USER HERE?? -------', req.session)
  res.render('user-home', {
    title: 'Home',
    csrfToken: req.csrfToken(),
    tasks,
    lists,
  })
}))

module.exports = router;
