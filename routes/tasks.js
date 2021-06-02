var express = require('express')
const { check, validationResult } = require('express-validator')
var router = express.Router()
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')


router.get('/', function (req, res, next) {
  res.send('we are in tasks')
})

router.get('/new', asyncHandler(async (req, res, next) => {
  const newTask = db.Task.build()
  res.render('task', {
    title: 'Tasks'
  })
}))

const taskValidators = [
  check("content")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a task.")
    .isLength({ max: 255 })
    .withMessage("Must not exceed 255 characters")
]

router.post('/new', taskValidators, asyncHandler(async (req, res, next) => {
  const {
    content,
    dueDate,
    startDate,
    priority,
    repeat,
    location
  } = req.body

  const newTask = db.Task.build({
    content,
    dueDate,
    startDate,
    priority,
    repeat,
    location
  })

  const validatorErrors = validationResult(req)

  if (validatorErrors.isEmpty()) {
    await newTask.save();
    res.redirect('/')
  }
  else {
    console.log('failed!!!!!!!!')
  }

}))



module.exports = router;