const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const auth = require('./auth.service')

const nulluser = require('../lib/type').user()

exports.searchUser = async (userid, userid_or_nickname) => {
    try {
        const db = await rds.getConnection()
        try {
            let result = await auth.matchUserid(userid_or_nickname)
            if (result.code == 0) { 
                const [queryResult] = await db.query(queryStr.searchUserByUserid, [userid_or_nickname, userid_or_nickname, userid])
                db.release()
                return res.userResponse(0,queryResult)
            }
            result = await auth.matchNickname(userid_or_nickname) 
            if (result.code !== 0)
                throw 1

            const [queryResult] = await db.query(queryStr.searchUserByNickname, [userid_or_nickname, userid_or_nickname, userid])
            db.release()
            return res.userResponse(0, queryResult)
        } catch (err) {
            db.release()
            if (err == 1) {
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

exports.addFriend = async (userid, target_userid) => {
    try {
        const db = await rds.getConnection()
        try {
            const [optionResult] = await db.query(queryStr.checkFriendInviteOption, [target_userid])
            
            if (optionResult[0].friendInviteOption === 1)
                throw 2
                
            const [queryResult] = await db.query(queryStr.addFriend, [userid, target_userid, target_userid, userid, userid, target_userid])
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
                return res.genericResponse(0)
            }
            console.log(err)
            return res.genericResponse(-1)
        }
    } catch (err) {
        console.log(err)
        return res.genericResponse(-1)
    }
}

exports.blockFriend = async (userid, target_userid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.blockFriend, [userid, target_userid, userid, target_userid])
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
            console.log(err)
            return res.genericResponse(-1)
        }
    } catch (err) {
        console.log(err)
        return res.genericResponse(-1)
    }
}

exports.listFriend = async (userid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.listFriend, userid)
            db.release()

            return res.userResponse(0, queryResult)
        } catch (err) {
            db.release()
            console.log(err)
            return res.userResponse(-1, [nulluser])
        }
    } catch (err) {
        console.log(err)
        return res.userResponse(-1, [nulluser])
    }
}