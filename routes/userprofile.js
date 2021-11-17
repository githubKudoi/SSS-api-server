const express = require('express')

const controller = require('../controller/userprofile.controller')

const router = express.Router()
router.use(express.urlencoded({extended: false}))

router.post('/edit', controller.editProfile)
router.post('/option', controller.option)
router.post('/logout', controller.logout)

router.get('/', controller.profile)
router.get('/stats', controller.stats)

// get planlist
// logout
module.exports = router