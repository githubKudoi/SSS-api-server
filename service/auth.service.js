const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const fcm = require('../lib/fcm')

exports.login = async (userid, password, token) => {
    try {
        console.log(userid, password, token)
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
            return res.userResponse(0, result)
        } catch (err) {
            if (err == 1) {
                console.log("ID or Password unmatch.")
                return res.userResponse(1, null)
            }
            return res.userResponse(-1, null)
        }
    } catch (err) {
        console.log(err)
        return res.genericResponse(-1)
    }
}

exports.apiLogin = async (userid, token) => {
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
        await db.query(queryStr.setToken, [token])
        return res.userResponse(0, result)
    } catch (err) {
        if (err == 1) {
            console.log("ID or Password unmatch.")
            return res.userResponse(1, null)
        }
        return res.userResponse(-1, null)
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

exports.apiRegister = async (userid, password, nickname) => {
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
            const [queryResult] = await db.query(queryStr.getUser, userid)
            db.release()

            if (queryResult.length == 0)
                throw 1

            
            return res.userResponse(0, queryResult)
        } catch (err) {
            db.release()
            if (err == 1) {
                console.log("ID unmatch")
                return res.userResponse(1, null)
            }
            console.log(err)
            return res.userResponse(-1, null)
        }
    } catch (err) {
        console.log(err)
        return res.userResponse(-1, null)
    }
}

exports.matchUserid = async (userid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.searchUserid, userid)
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
                console.log("Nickname unmatch")
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
                console.log("Password unmatch")
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