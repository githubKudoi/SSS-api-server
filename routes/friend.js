const express = require('express')

const controller = require('../controller/friend.controller')

const router = express.Router()
router.use(express.urlencoded({extended: false}))

router.post('/search', controller.searchUser)
router.post('/add', controller.addFriend)
router.post('/block', controller.blockFriend)
router.post('/delete', controller.deleteFriend)

router.post('/list', controller.listFriend)

module.exports = router