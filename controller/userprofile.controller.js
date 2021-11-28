const service = require('../service/userprofile.service')

exports.editProfile = async (req, res) => {
    const body = req.body
    const serverResponse = await service.editProfile(
        body.userid,
        body.nickname,
        body.username,
        body.age,
        body.gender
        )
    
    res.json(serverResponse)
}

exports.uploadAvatar = async (req, res) => {
    const body = req.body
    const serverResponse = await service.uploadAvatar(
        body.userid,
        req.file
    )

    res.json(serverResponse)
}

exports.downloadAvatar = async (req, res) => {
    const serverResponse = await service.downloadAvatar(
        req.params.userid
    )

    res.writeHead(200, { 'Content-Type': 'image/*; charset=utf-8' });
    res.end(serverResponse);
}

exports.setOptions = async (req, res) => {
    const body = req.body
    const serverResponse = await service.setOptions(
        body.userid,
        body.notice_option,
        body.plan_invite_option,
        body.friend_invite_option
    )
    
    res.json(serverResponse)
}

exports.getOptions = async (req, res) => {
    const body = req.body
    const serverResponse = await service.getOptions(
        body.userid
    )
    
    res.json(serverResponse)
}

exports.addPoint = async (req, res) => {
    const body = req.body
    const serverResponse = await service.addPoint(
        body.userid,
        body.point
    )
    
    res.json(serverResponse)
}

exports.subPoint = async (req, res) => {
    const body = req.body
    const serverResponse = await service.subPoint(
        body.userid,
        body.point
    )
    
    res.json(serverResponse)
}

exports.logout = async (req, res) => {
    const body = req.body
    const serverResponse = await service.logout(
        body.userid
    )
    
    res.json(serverResponse)
}

exports.profile = async (req, res) => {
    const body = req.body
    const serverResponse = await service.profile(
        body.userid
    )
    
    res.json(serverResponse)
}

exports.stats = async (req, res) => {
    const body = req.body
    const serverResponse = await service.stats(
        body.userid
    )
    
    res.json(serverResponse)
}