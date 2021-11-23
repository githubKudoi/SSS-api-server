const service = require('../service/memo.service')

exports.createMemo = async (req, res) => {
    const body = req.body
    const serverResponse = await service.createMemo(
        body.userid,
        body.pid,
        body.memo
        )
    
    res.json(serverResponse)
}

exports.deleteMemo = async (req, res) => {
    const body = req.body
    const serverResponse = await service.deleteMemo(
        body.userid,
        body.pid
    )
    
    res.json(serverResponse)
}

exports.listMemo = async (req, res) => {
    const body = req.body
    const serverResponse = await service.listMemo(
        body.pid
    )
    
    res.json(serverResponse)
}
