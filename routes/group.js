const express = require('express')

const controller = require('../controller/group.controller')

const router = express.Router()
router.use(express.urlencoded({extended: false}))

router.post('/create', controller.createGroup)
router.post('/edit', controller.editGroup)
router.post('/invite', controller.inviteGroup)
router.post('/kick', controller.kickGroup)
router.post('/delete', controller.deleteGroup)

router.get('/list', controller.listGroup)
router.get('/details', controller.detailsGroup)

module.exports = router