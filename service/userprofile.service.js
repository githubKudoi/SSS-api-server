const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const datatype = require('../lib/type')

exports.createProfile = async (userid, nickname, username, age, gender, image) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.newProfile, [userid, nickname, username, age, gender, image])
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
            console.log("Query error")
            return res.genericResponse(-1)
        }
    } catch (err) {
        console.log("DB error")
        return res.genericResponse(-1)
    }
}

exports.editProfile = async (userid, nickname, username, age, gender, image) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.editProfile, [userid, nickname, username, age, gender, image])
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
            console.log("Query error")
            return res.genericResponse(-1)
        }
    } catch (err) {
        console.log("DB error")
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
            console.log("Query error")
            return res.genericResponse(-1)
        }
    } catch (err) {
        console.log("DB error")
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
                console.log("Nothing affected")
                return res.genericResponse(1)
            }
            console.log("Query error")
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
            console.log("Query error")
            return res.profileResponse(-1, nullProfile)
        }
    } catch (err) {
        console.log("DB error")
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
            console.log("Query error")
            return res.statsResponse(-1, null)
        }
    } catch (err) {
        console.log("DB error")
        return res.statsResponse(-1, null)
    }
}