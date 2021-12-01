const service = require('../service/plan.service')

exports.createPlan = async (req, res) => {
    const body = req.body
    const serverResponse = await service.createPlan(
        body.name,
        body.start_time,
        body.end_time,
        body.location,
        body.category,
        body.creator,
        body.gid
        )
    
    res.json(serverResponse)
}

exports.editPlan = async (req, res) => {
    const body = req.body
    const serverResponse = await service.editPlan(
        body.pid,
        body.name,
        body.start_time,
        body.end_time,
        body.location,
        body.category,
        body.gid
    )
    
    res.json(serverResponse)
}

exports.invitePlan = async (req, res) => {
    const body = req.body
    const serverResponse = await service.invitePlan(
        body.pid,
        body.userid,
        body.target_userid_list
    )
    
    res.json(serverResponse)
}

exports.invitePlanAccept = async (req, res) => {
    const body = req.body
    const serverResponse = await service.invitePlanAccept(
        body.pid,
        body.userid,
        body.is_accepted
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
        body.pid
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
        body.is_current,
        body.is_mine
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