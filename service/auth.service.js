const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const fcm = require('../lib/fcm')

const nulluser = require('../lib/type').user()

exports.login = async (userid, password, token) => {
    try {
        const db = await rds.getConnection()
        try {
            let result = await this.matchUserid(userid)

            if (result.code != 0)
                throw result.code
            else 
                result = await this.matchPassword(userid, password)
            if (result.code != 0)
                throw result.code
            else
                result = await this.searchUserid(userid)

            await db.query(queryStr.setOnline, [userid])
            await db.query(queryStr.setToken, [token, userid])
            
            return res.userResponse(0, result.user)
        } catch (err) {
            if (err == 1) {
                return res.userResponse(1, nulluser)
            }
            return res.userResponse(-1, nulluser)
        }
    } catch (err) {
        console.log(err)
        return res.genericResponse(-1)
    }
}

exports.apiLogin = async (api_id, token) => {
    try {
        const db = await rds.getConnection()
        try {
            let [result] = await db.query(queryStr.searchApiId, api_id)

            if (result.length == 0)
                throw 1
            else {
                [result] = await db.query(queryStr.getUserbyUserid, [result[0].userId])
            }
            await db.query(queryStr.setOnline, result[0].userId)

            //await db.query(queryStr.setToken, [token, result[0].userId])
            
            return res.userResponse(0, result[0])
        } catch (err) {
            if (err == 1) {
                console.log("API ID not match")
                return res.userResponse(1, nulluser)
            }
            console.log(err)
            return res.userResponse(-1, nulluser)
        }
    } catch (err) {
        console.log(err)
        return res.genericResponse(-1, nulluser)
    }
}

exports.apiRegister = async (userid, nickname, api_id) => {
    try {
        const db = await rds.getConnection()
        try {
            let result = await this.matchUserid(userid)
            if (result.code !== 1)
                throw 1

            const [queryResult] = await db.query(queryStr.apiRegister, [userid, nickname, api_id])
            db.release()

            if (queryResult.affectedRows == 0)
                throw 1

            console.log("User created")
            return res.genericResponse(0)
        } catch (err) {
            db.release()
            if (err == 1) {
                console.log("ID duplicate")
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

exports.register = async (userid, password, nickname) => {
    try {
        const db = await rds.getConnection()
        try {
            let result = await this.matchUserid(userid)
            if (result.code !== 1)
                throw 2

            const [queryResult] = await db.query(queryStr.register, [userid, password, nickname, 0])
            db.release()

            if (queryResult.affectedRows == 0)
                throw 1

            console.log("User created")
            return res.genericResponse(0)
        } catch (err) {
            db.release()
            if (err == 1) {
                console.log("Nothing affected")
                return res.genericResponse(1)
            }
            if (err == 2) {
                console.log("ID duplicate")
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

exports.searchUserid = async (userid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.getUserbyUserid, [userid])
            db.release()

            if (queryResult.length == 0)
                throw 1

            return res.userResponse(0, queryResult[0])
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

exports.matchUserid = async (userid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.searchUserid, [userid])
            db.release()

            if (queryResult.length == 0)
                throw 1

            return res.genericResponse(0)
        } catch (err) {
            db.release()
            if (err == 1) {
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

exports.matchNickname = async (nickname) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.searchNickname, nickname)
            db.release()

            if (queryResult.length == 0)
                throw 1

            return res.genericResponse(0)
        } catch (err) {
            db.release()
            if (err == 1) {
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

exports.push = async (token) => {
    // 'icon': "https://drive.google.com/uc?id=12GnQBA6twlWHHakJ109NqYKj3zIxsM75"
    try {
        const fcmResponse = await fcm.send("group", "1", "kudoi", "sooyongjeongGroup")
    } catch (err) {
        console.log("FCM sent msg failed.", err)
    }
}