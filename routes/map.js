const express = require('express')

const controller = require('../controller/map.controller')

const router = express.Router()
router.use(express.urlencoded({extended: false}))

router.post('/popularity', controller.popularity)
router.post('/keyword', controller.keyword)
router.post('/mylocation', controller.myLocation)
router.post('/location', controller.location)
router.post('/eta', controller.eta)

module.exports = router