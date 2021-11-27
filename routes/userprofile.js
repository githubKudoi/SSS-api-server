const express = require('express')
const multer = require('multer')

const controller = require('../controller/userprofile.controller')

const router = express.Router()
router.use(express.urlencoded({extended: false}))

let _storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads/')
    },
    filename: (req, file, cb) => {
        let newFileName = new Date().valueOf() + path.extname(file.originalname)
        cb(null, newFileName)
    },
})
let upload = multer({ storage: _storage })

router.post('/edit', controller.editProfile)
router.post('/option', controller.option)
router.post('/logout', controller.logout)

router.post('/stats', controller.stats)
router.post('/', controller.profile)

router.post('/image/upload', upload.single('image'), controller.uploadAvatar)
router.get('/image/:userid', controller.downloadAvatar)

module.exports = router