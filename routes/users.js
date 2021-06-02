var express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const db = require('../db/models')

const { csrfProtection, asyncHandler } = require('./utils')

var router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', csrfProtection, asyncHandler(async(req, res, next) => {
  const newUser = db.User.build()
  res.render('user-register', {
    title: 'Register',
    newUser,
    csrfToken: req.csrfToken()
  })
}))

const userValidators = [
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a Username")
    .isLength({ max: 50 })
    .withMessage("Username must not exceed 50 characters")
    .custom((value) => {
      return db.User.findOne({ where: { userName: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Username is already in use by another account')
          }
        })
      }),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an Email Address")
    .isEmail()
    .withMessage("Must be a valid Email Address")
    .isLength({ max: 254 })
    .withMessage("Email Address must not exceed 254 characters")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account')
          }
        })
      }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a Password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
    .withMessage("Password must include a Lowercase Letter, Uppercase Letter, Number, and Special Character(!@#$%^&*)"),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Must match Password")
    .custom((value, { req }) => {
      if ( value !== req.body.password) {
          throw new Error('Confirm Password does not match Password')
      }
      return true
    })
]

router.post('/register', csrfProtection, userValidators, asyncHandler(async(req, res, next) => {
  const {
    userName,
    email,
    password,
    confirmPassword
  } = req.body

  const newUser = db.User.build({
    userName,
    email,
    password,
    confirmPassword
  })

  const validatorErrors = validationResult(req)

  if(validatorErrors.isEmpty()){
    const hashedPassword = await bcrypt.hash(password, 8)
    newUser.hashed_password = hashedPassword
    await newUser.save()

    res.redirect('/')
  }
  else {
    const errors = validatorErrors.array().map((error) => error.msg)
    res.render('user-register', {
      title: 'Register',
      newUser,
      errors,
      csrfToken: req.csrfToken()
    })
  }

}))


module.exports = router;
