const service = require('../service/auth.service')

exports.login = async (req, res) => {
    const body = req.body
    const serverResponse = await service.login(
        body.userid,
        body.password)
    
    res.json(serverResponse)
}

exports.register = async (req, res) => {
    const body = req.body
    const serverResponse = await service.register(
        body.userid,
        body.password,
        body.nickname)
    
    res.json(serverResponse)
}

exports.user = async (req, res) => {
    const body = req.body
    const serverResponse = await service.searchUserid(
        body.userid)
    
    res.json(serverResponse)
}