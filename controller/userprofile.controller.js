const service = require('../service/userprofile.service')

exports.editProfile = async (req, res) => {
    const body = req.body
    const serverResponse = await service.editProfile(
        body.userid,
        body.nickname,
        body.username,
        body.age,
        body.gender,
        body.image
        )
    
    res.json(serverResponse)
}

exports.option = async (req, res) => {
    const body = req.body
    const serverResponse = await service.option(
        body.userid,
        body.notice_option,
        body.friend_invite_option,
        body.plan_invite_option
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