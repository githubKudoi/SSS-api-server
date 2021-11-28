const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const fs = require('fs')

const nullprofile = require('../lib/type').profile()
const nullstats = require('../lib/type').stats()
const nulloptions = require('../lib/type').options()

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
            if (!image)
                throw 2
            
            const [queryResult] = await db.query(queryStr.setAvatarPath, [image.originalname, userid]) // 이미지 설정 쿼리문
            
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
            const [queryResult] = await db.query(queryStr.getAvatarPath, userid)

            if (queryResult[0].image.length == 0)
                throw 1

            const file = fs.createReadStream(queryResult[0].image)
            return res.imageResponse(0, file)
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

exports.setOptions = async (userid, notice_option, plan_invite_option, friend_invite_option) => {
    try {
        const db = await rds.getConnection()
        try {
            let queryResult

            if (notice_option == 'true')
                [queryResult] = await db.query(queryStr.setNoticeOption, [true, userid])
            else 
                [queryResult] = await db.query(queryStr.setNoticeOption, [false, userid])

            if (plan_invite_option == 'true') 
                [queryResult] = await db.query(queryStr.setPlanInviteOption, [true, userid])
            else 
                [queryResult] = await db.query(queryStr.setPlanInviteOption, [false, userid])

            if (friend_invite_option == 'true')
                [queryResult] = await db.query(queryStr.setPlanInviteOption, [true, userid])
            else
                [queryResult] = await db.query(queryStr.setPlanInviteOption, [false, userid])


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
            console.log(err)
            return res.genericResponse(-1)
        }
    } catch (err) {
        console.log(err)
        return res.genericResponse(-1)
    }
}

exports.getOptions = async (userid) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.getOptions, userid)

            if (queryResult.length == 0)
                throw 1
            db.release()

            return res.optionsResponse(0, queryResult[0])
        } catch (err) { 
            db.release()
            console.log(err)
            return res.optionsResponse(-1, nulloptions)
        }
    } catch (err) {
        console.log(err)
        return res.optionsResponse(-1, nulloptions)
    }
}

exports.logout = async (userid) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.logout, userid)
            db.release()
            console.log(queryResult)

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

            return res.statsResponse(0, queryResult[0])
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