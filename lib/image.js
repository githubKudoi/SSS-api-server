const path = require('path')
const fs = require('fs')

const _downloadDir = '../upload/'

exports.getfilePath = (userid) => {
    try {
        let extName = ''
        const fileList = fs.readdir(_downloadDir)
        fileList.forEach (file => {
            extName = path.extname(file)
            if (path.basename(file) === userid + extName)
                return dir + userid + extName
            
            return null
        })
    } catch (err) {
        console.log(err)
        return null
    }
}