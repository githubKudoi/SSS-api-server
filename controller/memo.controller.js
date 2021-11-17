const service = require('../service/memo.service')

exports.createMemo = async (req, res) => {
    const body = req.body
    const serverResponse = await service.createMemo(
        body.uid,
        body.pid,
        body.memo
        )
    
    res.json(serverResponse)
}

exports.deleteMemo = async (req, res) => {
    const body = req.body
    const serverResponse = await service.deleteMemo(
        body.uid,
        body.pid
    )
    
    res.json(serverResponse)
}

exports.listMemo = async (req, res) => {
    const body = req.body
    const serverResponse = await service.listMemo(
        body.uid,
        body.pid
    )
    
    res.json(serverResponse)
}