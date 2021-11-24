const express = require('express')

const controller = require('../controller/auth.controller')

const router = express.Router()
router.use(express.urlencoded({extended: false}))

router.post('/api/register', controller.apiRegister)
router.post('/api/login', controller.apiLogin)
router.post('/register', controller.register)
router.post('/user', controller.user)
router.post('/login', controller.login)

router.post('/push', controller.push)

module.exports = router