const express = require('express')

const controller = require('../controller/group.controller')

const router = express.Router()
router.use(express.urlencoded({extended: false}))

router.post('/create', controller.createGroup)
router.post('/edit', controller.editGroup)
router.post('/invite/accept', controller.inviteGroupAccept)
router.post('/invite', controller.inviteGroup)
router.post('/kick', controller.kickGroup)
router.post('/delete', controller.deleteGroup)

router.post('/list', controller.listGroup)
router.post('/details', controller.detailsGroup)

module.exports = router