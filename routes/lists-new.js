const express = require('express')
const { check, validationResult } = require('express-validator')

const db = require('../db/models')

const { csrfProtection, asyncHandler } = require('./utils')

const { requireAuth } = require('../auth')

const router = express.Router()

router.get('/new', requireAuth, csrfProtection, asyncHandler(async(req, res, next) => {
  const id = req.params.id

  const newList = db.List.build()
  res.render('list-new', {
    title: 'Create List',
    newList,
    csrfToken: req.csrfToken()
  })
}))

const listValidators = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a name for your List")
    .isLength({ max: 255 })
    .withMessage("Name must not exceed 255 characters")
    .custom((value) => {
      return db.List.findOne({ where: { name: value } })
        .then((list) => {
          if (list) {
            return Promise.reject('A List already exists with this name')
          }
        })
    })
]

router.post('/new', requireAuth, csrfProtection, listValidators, asyncHandler(async(req, res, next) => {
  if(req.session.auth){
    const { userId } = req.session.auth

    const {
      name
    } = req.body

    const newList = db.List.build({
      name,
      user_Id: userId
    })

    const validatorErrors = validationResult(req)

    if(validatorErrors.isEmpty()){
      await newList.save()

      res.redirect(`/home`)
    }
    else {
      const errors = validatorErrors.array().map((error) => error.msg)
      res.render('list-new', {
        title: 'Create List',
        newList,
        errors,
        csrfToken: req.csrfToken()
      })
    }
  }


}))

module.exports = router;
