const service = require('../service/map.service')

exports.popularity = async (req, res) => {
    const body = req.body
    const serverResponse = await service.popularity()
    
    res.json(serverResponse)
}

exports.keyword = async (req, res) => {
    const body = req.body
    const serverResponse = await service.keyword(
        body.longitude,
        body.latitude
    )
    
    res.json(serverResponse)
}

exports.myLocation = async (req, res) => {
    const body = req.body
    const serverResponse = await service.myLocation(
        body.longitude,
        body.latitude
    )
    
    res.json(serverResponse)
}

exports.location = async (req, res) => {
    const body = req.body
    const serverResponse = await service.location(
        body.uid,
        body.pid
    )
    
    res.json(serverResponse)
}

exports.eta = async (req, res) => {
    const body = req.body
    const serverResponse = await service.eta(
        body.startAddress,
        body.destAddress
    )
    
    res.json(serverResponse)
}