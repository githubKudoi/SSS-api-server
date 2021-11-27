const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')

const nullprofile = require('../lib/type').profile()
const nullstats = require('../lib/type').stats()

exports.editProfile = async (userid, nickname, username, age, gender) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.editProfile, [nickname, username, age, gender, userid])
            db.release()

            if (queryResult.affectedRows == 0)
                throw 1

            return res.genericResponse(0)
        } catch (err) { 
            db.release()
            if (err == 1) {
                console.log("Nothing affected")
                return res.genericResponse(1)
            }
            console.log(err)
            return res.genericResponse(-1)
        }
    } catch (err) {
        console.log(err)
        return res.genericResponse(-1)
    }
}

exports.uploadAvatar = async (userid, image) => {
    try {
        const db = await rds.getConnection()
        try {
            const file = image

            if (!file)
                throw 2

            const originalName = file.originalname
            const filename = file.filename
            const mimeType = file.mimeType
            const size = file.size
            const imageData = readImageFile('../uploads/' + originalName)

            const [queryResult] = await db.query(queryStr.setAvatar, [image, userid]) // 이미지 설정 쿼리문

            if (queryResult.affectedRows == 0)
                throw 1
            db.release()
            return res.genericResponse(0)
        } catch (err) {
            db.release()
            if (err == 1) {
                console.log("Nothing affected")
                return res.genericResponse(1)
            }
            if (err == 2) {
                console.log("Image not found")
                return res.genericResponse(1)
            }
            console.log(err)
            return res.genericResponse(-1)
        }
    } catch (err) {
        console.log(err)
        return res.genericResponse(-1)
    }
}

exports.downloadAvatar = async (userid) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.getAvatar, userid)

            if (queryResult.length == 0)
                throw 1

            return res.imageResponse(0, queryResult[0])
        }catch (err) {
            db.release()
            if (err == 1) {
                console.log("Image not found")
                return res.imageResponse(1, null)
            }
            console.log(err)
            return res.imageResponse(-1, null)
        }
    } catch (err) {
        console.log(err)
        return res.genericResponse(-1, null)
    }
}

exports.option = async (userid, notice_option, friend_invite_option, plan_invite_option) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.setNoticeOption, [userid, notice_option])

            if (queryResult.affectedRows == 0)
                throw 1
            
            [queryResult] = await db.query(queryStr.setInviteFriendOption, [userid, friend_invite_option])

            if (queryResult.affectedRows == 0)
                throw 1

            [queryResult] = await db.query(queryStr.setInvitePlanOption, [userid, plan_invite_option])

            if (queryResult.affectedRows == 0)
                throw 1
            db.release()

            return res.planResponse(queryResult)
        } catch (err) { 
            db.release()
            if (err == 1) {
                console.log("Nothing affected")
                return res.genericResponse(1)
            }
            console.log(err)
            return res.genericResponse(-1)
        }
    } catch (err) {
        console.log(err)
        return res.genericResponse(-1)
    }
}

exports.logout = async (userid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.logout, userid)
            db.release()

            if (queryResult.affectedRows == 0)
                throw 1

            return res.genericResponse(0)
        } catch (err) { 
            db.release()
            if (err == 1) {
                console.log(err)
                return res.genericResponse(1)
            }
            console.log(err)
            return res.genericResponse(-1)
        }
    } catch (err) {
        console.log("DB error")
        return res.genericResponse(-1)
    }
}

exports.profile = async (userid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.getProfile, userid)
            db.release()

            if (queryResult.length == 0)
                throw 1
                
            return res.profileResponse(0, queryResult[0])
        } catch (err) { 
            db.release()
            if (err == 1) {
                console.log("Nothing affected")
                return res.profileResponse(1, nullprofile)
            }
            console.log(err)
            return res.profileResponse(-1, nullprofile)
        }
    } catch (err) {
        console.log(err)
        return res.profileResponse(-1, nullprofile)
    }
}

exports.stats = async (userid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.getStats, userid)
            db.release()

            if (queryResult.length == 0)
                throw 1

            return res.statsResponse(0, queryResult)
        } catch (err) { 
            db.release()
            if (err == 1) {
                console.log("Nothing affected")
                return res.statsResponse(1, nullstats)
            }
            console.log(err)
            return res.statsResponse(-1, nullstats)
        }
    } catch (err) {
        console.log(err)
        return res.statsResponse(-1, nullstats)
    }
}