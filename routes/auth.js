const express = require('express')

const controller = require('../controller/auth.controller')

const router = express.Router()
router.use(express.urlencoded({extended: false}))

router.post('/register', controller.register)
router.post('/user', controller.user)
router.post('/login', controller.login)

module.exports = router