const service = require('../service/plan.service')

exports.createPlan = async (req, res) => {
    const body = req.body
    const serverResponse = await service.createPlan(
        body.name,
        body.start_time,
        body.end_time,
        body.location,
        body.category,
        body.creator
        )
    
    res.json(serverResponse)
}

exports.editPlan = async (req, res) => {
    const body = req.body
    const serverResponse = await service.editPlan(
        body.name,
        body.date,
        body.start_time,
        body.end_time,
        body.location,
        body.category
    )
    
    res.json(serverResponse)
}

exports.invitePlan = async (req, res) => {
    const body = req.body
    const serverResponse = await service.invitePlan(
        body.pid,
        body.target_userid_list
    )
    
    res.json(serverResponse)
}

exports.kickPlan = async (req, res) => {
    const body = req.body
    const serverResponse = await service.kickPlan(
        body.pid,
        body.target_userid_list
    )
    
    res.json(serverResponse)
}

exports.completePlan = async (req, res) => {
    const body = req.body
    const serverResponse = await service.completePlan(
        body.pid,
        body.userid
    )
    
    res.json(serverResponse)
}

exports.cancelPlan = async (req, res) => {
    const body = req.body
    const serverResponse = await service.cancelPlan(
        body.pid,
        body.userid
    )
    
    res.json(serverResponse)
}

exports.publicPlan = async (req, res) => {
    const body = req.body
    const serverResponse = await service.publicPlan(
        body.pid,
        body.visibility
    )
    
    res.json(serverResponse)
}

exports.deletePlan = async (req, res) => {
    const body = req.body
    const serverResponse = await service.deletePlan(
        body.pid
    )
    
    res.json(serverResponse)
}

exports.listPlan = async (req, res) => {
    const body = req.body
    const serverResponse = await service.listPlan(
        body.userid,
        body.is_current
    )
    
    res.json(serverResponse)
}

exports.detailsPlan = async (req, res) => {
    const body = req.body
    const serverResponse = await service.detailsPlan(
        body.pid
    )
    
    res.json(serverResponse)
}

exports.partlist = async (req, res) => {
    const body = req.body
    const serverResponse = await service.partlist(
        body.pid
    )
    
    res.json(serverResponse)
}