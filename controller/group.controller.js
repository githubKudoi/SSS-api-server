const service = require('../service/group.service')

exports.createGroup = async (req, res) => {
    const body = req.body
    const serverResponse = await service.createGroup(
        body.name,
        body.explanation,
        body.color,
        body.creator
        )
    
    res.json(serverResponse)
}

exports.editGroup = async (req, res) => {
    const body = req.body
    const serverResponse = await service.editGroup(
        body.gid,
        body.name,
        body.explanation,
        body.color,
        body.creator
    )
    
    res.json(serverResponse)
}

exports.inviteGroup = async (req, res) => {
    const body = req.body
    const serverResponse = await service.inviteGroup(
        body.gid,
        body.target_userid_list
    )
    
    res.json(serverResponse)
}

exports.kickGroup = async (req, res) => {
    const body = req.body
    const serverResponse = await service.kickGroup(
        body.gid,
        body.target_userid_list
    )
    
    res.json(serverResponse)
}

exports.deleteGroup = async (req, res) => {
    const body = req.body
    const serverResponse = await service.deleteGroup(
        body.gid
    )
    
    res.json(serverResponse)
}

exports.listGroup = async (req, res) => {
    const body = req.body
    const serverResponse = await service.listGroup(
        body.userid
    )
    
    res.json(serverResponse)
}

exports.detailsGroup = async (req, res) => {
    const body = req.body
    const serverResponse = await service.detailsGroup(
        body.gid
    )
    
    res.json(serverResponse)
}