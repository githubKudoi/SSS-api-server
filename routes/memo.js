const express = require('express')

const controller = require('../controller/memo.controller')

const router = express.Router()
router.use(express.urlencoded({extended: false}))

router.post('/create', controller.createMemo)
router.post('/delete', controller.deleteMemo)

router.post('/list', controller.listMemo)

module.exports = router