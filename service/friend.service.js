const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const datatype = require('../lib/type')

exports.searchUser = async (userid_or_nickname) => {
    const nulluser = datatype.user()

    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.searchUserid, [userid_or_nickname])

            if (queryResult.length == 0)
                queryResult = await db.query(queryStr.searchNickname, [userid_or_nickname])
            db.release()

            if (queryResult.length == 0)
                throw 1

            return res.userResponse(0, queryResult)
        } catch (err) {
            db.release()
            if (err == 1) {
                console.log("Userid and uname unmatch")
                return res.userResponse(1, nulluser)
            }
            console.log("Query error")
            return res.userResponse(-1, nulluser)
        }
    } catch (err) {
        console.log("DB error")
        return res.userResponse(-1, nulluser)
    }
}

exports.addFriend = async (userid, target_userid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
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
    const nulluser = datatype.user()

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