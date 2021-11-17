const express = require('express')

const controller = require('../controller/plan.controller')

const router = express.Router()
router.use(express.urlencoded({extended: false}))

router.post('/create', controller.createPlan)
router.post('/edit', controller.editPlan)
router.post('/invite', controller.invitePlan)
router.post('/kick', controller.kickPlan)
router.post('/complete', controller.completePlan)
router.post('/cancel', controller.cancelPlan)
router.post('/public', controller.publicPlan)
router.post('/delete', controller.deletePlan)

router.post('/list', controller.listPlan)
router.post('/details', controller.detailsPlan)
router.post('/partlist', controller.partlist)

// get friendlist
module.exports = router