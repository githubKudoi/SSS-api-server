const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const datatype = require('../lib/type')
const multer = require('multer')

exports.editProfile = async (userid, nickname, username, age, gender) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.editProfile, [userid, nickname, username, age, gender])
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

exports.image = async (image) => {
    try {
        const db = await rds.getConnection()
        try {
            const file = image

            if (!file)
                throw 2

            const originalName = file.originalName
            const filename = file.filename
            const mimeType = file.mimeType
            const size = file.size

            const [queryResult] = await db.query(queryStr) // 이미지 설정 쿼리문

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
    const nullProfile = datatype.profile()
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.getProfile, userid)
            db.release()

            if (queryResult.length == 0)
                throw 1

            return res.profileResponse(0, queryResult)
        } catch (err) { 
            db.release()
            if (err == 1) {
                console.log("Nothing affected")
                return res.profileResponse(1, nullProfile)
            }
            console.log(err)
            return res.profileResponse(-1, nullProfile)
        }
    } catch (err) {
        console.log(err)
        return res.profileResponse(-1, nullProfile)
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
                return res.statsResponse(1, null)
            }
            console.log(err)
            return res.statsResponse(-1, null)
        }
    } catch (err) {
        console.log(err)
        return res.statsResponse(-1, null)
    }
}