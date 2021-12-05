const express = require('express')

const controller = require('../controller/map.controller')

const router = express.Router()
router.use(express.urlencoded({extended: false}))

router.post('/popularity', controller.popularity)
router.post('/location/set', controller.myLocation)
router.post('/location', controller.location)

module.exports = router