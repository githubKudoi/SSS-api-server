const express = require('express')

const controller = require('../controller/userprofile.controller')

const router = express.Router()
router.use(express.urlencoded({extended: false}))

router.post('/edit', controller.editProfile)
router.post('/option', controller.option)
router.post('/logout', controller.logout)

router.get('/stats', controller.stats)
router.get('/', controller.profile)

// get planlist
// logout
module.exports = router