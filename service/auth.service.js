const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
let datatype = require('../lib/type')

const profile = require('../service/userprofile.service')

exports.login = async (userid, password) => {
    const nulluser = datatype.user()
    
    try {
        let result = await this.matchUserid(userid)

        if (result.code != 0)
            throw result.code
        else 
            result = await this.matchPassword(userid, password)
        if (result.code != 0)
            throw result.code
        else
            const userResult = await this.searchUserid(userid)

        const user = datatype.user(
            userResult.user.userid,
            userResult.user.username,
            userResult.user.isOnline,
            userResult.user.isAttend)

        return res.userResponse(0, user)
    } catch (err) {
        if (err == 1) {
            console.log("ID or Password unmatch.")
            return res.userResponse(1, nulluser)
        }
        return res.userResponse(-1, nulluser)
    }
}

exports.register = async (userid, password, nickname) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            let result = await this.matchUserid(userid)
            if (result.code != 0)
                throw result.code

            const [queryResult] = await db.query(queryStr.register, [userid, password, nickname])
            db.release()
            
            if (queryResult.affectedRows == 0)
                throw 1

            result = await profile.createProfile(userid, nickname)

            if (result.code != 0)
                throw result.code

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

exports.searchUserid = async (userid) => {
    const nulluser = datatype.user()
    
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.searchUserid, userid)
            db.release()

            if (queryResult.length == 0)
                throw 1

            return res.userResponse(0, queryResult)
        } catch (err) {
            db.release()
            if (err == 1) {
                console.log("ID unmatch")
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

exports.matchUserid = async (userid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.matchUserid, userid)
            db.release()

            if (queryResult.length == 0)
                throw 1

            return res.genericResponse(0)
        } catch (err) {
            db.release()
            if (err == 1) {
                console.log("ID unmatch")
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

exports.matchPassword = async (userid, password) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.matchPassword, [userid, password])
            db.release()

            if (queryResult.length == 0)
                throw 1

            return res.genericResponse(0)
        } catch (err) {
            db.release()
            if (err == 1) {
                console.log("Password unmatch")
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