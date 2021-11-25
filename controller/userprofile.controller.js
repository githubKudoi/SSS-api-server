const multer = require('multer')
const service = require('../service/userprofile.service')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        let newFileName = new Date().valueOf() + path.extname(file.originalname)
        cb(null, newFileName)
    },
})
let upload = multer({ storage: storage })

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

exports.image = async (req, res) => {
    upload.single('upload')
    const serverResponse = await service.image(
        req.file
    )

    res.json(serverResponse)
}

exports.getImage = async (req, res) => {
    const serverResponse = await service.getImage(
        req.params.userid
    )

    res.writeHead(200, { 'Content-Type': 'image/*; charset=utf-8' });
    res.end(serverResponse);
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