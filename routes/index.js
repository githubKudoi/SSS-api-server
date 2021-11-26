const express = require('express')
const auth = require('./auth')
const friend = require('./friend')
const group = require('./group')
const map = require('./map')
const memo = require('./memo')
const plan = require('./plan')
const userprofile = require('./userprofile')

const router = express.Router()
router.use(express.urlencoded({extended: false}))

router.use('/auth', auth)
router.use('/friend', friend)
router.use('/group', group)
router.use('/map', map)
router.use('/memo', memo)
router.use('/plan', plan)
router.use('/profile', userprofile)

module.exports = router