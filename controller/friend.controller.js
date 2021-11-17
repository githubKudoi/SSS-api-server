const service = require('../service/friend.service')

exports.searchUser = async (req, res) => {
    const body = req.body
    const serverResponse = await service.searchUser(
        body.userid_or_nickname
        )
    
    res.json(serverResponse)
}

exports.addFriend = async (req, res) => {
    const body = req.body
    const serverResponse = await service.addFriend(
        body.userid,
        body.target_userid
    )
    
    res.json(serverResponse)
}

exports.blockFriend = async (req, res) => {
    const body = req.body
    const serverResponse = await service.blockFriend(
        body.userid,
        body.target_userid
    )
    
    res.json(serverResponse)
}

exports.deleteFriend = async (req, res) => {
    const body = req.body
    const serverResponse = await service.deleteFriend(
        body.userid,
        body.target_userid
    )
    
    res.json(serverResponse)
}

exports.listFriend = async (req, res) => {
    const body = req.body
    const serverResponse = await service.listFriend(
        body.userid
    )
    
    res.json(serverResponse)
}