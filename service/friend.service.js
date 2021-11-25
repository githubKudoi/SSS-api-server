const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const type = require('../lib/type')
const auth = require('./auth.service')

exports.searchUser = async (userid_or_nickname) => {
    const nulluser = type.user()
    try {
        const db = await rds.getConnection()
        try {
            let result = await auth.matchUserid(userid_or_nickname)
            if (result.code == 0) { 
                const [queryResult] = await db.query(queryStr.getUserbyUserid, userid_or_nickname)
                db.release()
                return res.userResponse(0,queryResult)
            }
            result = await auth.matchNickname(userid_or_nickname) 
            if (result.code !== 0)
                throw 1

            const [queryResult] = await db.query(queryStr.getUserbyNickname, userid_or_nickname)
            db.release()
            return res.userResponse(0, queryResult)
        } catch (err) {
            db.release()
            if (err == 1) {
                console.log("Userid or nickname unmatch")
                return res.userResponse(1, nulluser)
            }
            console.log(err)
            return res.userResponse(-1, nulluser)
        }
    } catch (err) {
        console.log(err)
        return res.userResponse(-1, nulluser)
    }
}
// 여기까지함
exports.addFriend = async (userid, target_userid) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.addFriend, [userid, target_userid])
            db.release()

            if (queryResult.affectedRows == 0)
                throw 1

            return res.genericResponse(0)
        } catch (err) {
            db.release()
            if (err == -1) {
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

exports.blockFriend = async (userid, target_userid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.blockFriend, [userid, target_userid])
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

exports.deleteFriend = async (userid, target_userid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.deleteFriend, [userid, target_userid])
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

exports.listFriend = async (userid) => {
    const nulluser = type.user()

    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.listFriend, userid)
            db.release()

            return res.userResponse(0, queryResult)
        } catch (err) {
            db.release()
            console.log("Query error")
            return res.userResponse(-1, nulluser)
        }
    } catch (err) {
        console.log("DB error")
        return res.userResponse(-1, nulluser)
    }
}