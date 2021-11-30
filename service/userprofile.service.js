const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')

const nullprofile = require('../lib/type').profile()
const nullstats = require('../lib/type').stats()
const nulloptions = require('../lib/type').options()

const imageDir = '/home/ubuntu/sss/uploads/'

exports.editProfile = async (userid, nickname, username, age, gender) => {
    try {
        console.log(userid, nickname, username, age, gender)
        const db = await rds.getConnection()
        try {
            let queryResult

            if (gender == 'true')
                [queryResult] = await db.query(queryStr.editProfile, [nickname, username, age, true, userid])
            else
                [queryResult] = await db.query(queryStr.editProfile, [nickname, username, age, false, userid])
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
    if (!image)
        throw 2
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.setAvatarPath, [image.originalname, userid])
            db.release()

            if (queryResult.affectedRows == 0)
                throw 1

            return res.genericResponse(0)
        } catch (err) {
            db.release()
            if (err == 1) {
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

            console.log(imageDir + queryResult[0].image)

            return imageDir + queryResult[0].image
        }catch (err) {
            db.release()
            if (err == 1) {
                console.log("Image not found")
                return null
            }
            console.log(err)
            return null
        }
    } catch (err) {
        console.log(err)
        return null
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
                [queryResult] = await db.query(queryStr.setFriendInviteOption, [true, userid])
            else
                [queryResult] = await db.query(queryStr.setFriendInviteOption, [false, userid])


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

exports.addPoint = async (userid, point) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.addPoint, [point, userid])
            db.release()

            if (queryResult.length == 0)
                throw 1

            return res.genericResponse(0)
        } catch (err) {
        console.log(err)
        return res.genericResponse(-1)
        }
    } catch (err) {
        console.log(err)
        return res.genericResponse(-1)
    }
}

exports.subPoint = async (userid, point) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.subPoint, [point, userid])
            db.release()

            if (queryResult.length == 0)
                throw 1
                
            return res.genericResponse(0)
        } catch (err) {
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
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.logout, userid)
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

exports.profile = async (userid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.getProfile, userid)
            db.release()
                
            return res.profileResponse(0, queryResult[0])
        } catch (err) { 
            db.release()
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