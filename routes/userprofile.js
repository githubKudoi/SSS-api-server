const express = require('express')
const multer = require('multer')

const controller = require('../controller/userprofile.controller')

const router = express.Router()
router.use(express.urlencoded({extended: false}))

let _storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
let upload = multer({ storage: _storage })

router.post('/edit', controller.editProfile)
router.post('/option', controller.getOptions)
router.post('/option/update', controller.setOptions)
router.post('/logout', controller.logout)
router.post('/stats', controller.stats)

router.post('/image/upload', upload.single('upload'), controller.uploadAvatar)
router.get('/image/:userid', controller.downloadAvatar)

router.post('/', controller.profile)
module.exports = router