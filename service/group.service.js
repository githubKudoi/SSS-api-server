const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const datatype = require('../lib/type')

exports.createGroup = async (name, explanation, color, creator) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.newGroup, [name, explanation, color, creator])
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

exports.editGroup = async (gid, name, explanation, color) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.editGroup, [gid, name, explanation, color])
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

exports.inviteGroup = async (gid, target_userid_list) => {
    try {
        // 푸시알림 동작 코드

        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.inviteGroup, [gid, target_userid_list])
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

exports.kickGroup = async (gid, target_userid_list) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.kickGroup, [gid, target_userid_list])
            db.release()

            if (queryResult.affectedRows == 0)
                throw -1

            return res.genericResponse(0)
        } catch (err) { 
            db.release()
            if (err < 0) {
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

exports.deleteGroup = async (gid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.deleteGroup, gid)
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

exports.listGroup = async (userid) => {
    const nullgroup = datatype.group()
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.listGroup, userid)
            db.release()

            return res.groupResponse(0, queryResult)
        } catch (err) { 
            db.release()
            console.log("Query error")
            return res.groupResponse(-1, nullgroup)
        }
    } catch (err) {
        console.log("DB error")
        return res.groupResponse(-1, nullgroup)
    }
}

exports.detailsGroup = async (gid) => {
    const nullgroup = datatype.group()
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.detailsGroup, gid)
            db.release()

            if (queryResult.length == 0)
                throw 1

            return res.groupResponse(0, queryResult)
        } catch (err) { 
            db.release()
            if (err == 1) {
                console.log("No group details")
                return res.groupResponse(1, nullgroup)
            }
            console.log("Query error")
            return res.groupResponse(-1, nullgroup)
        }
    } catch (err) {
        console.log("DB error")
        return res.groupResponse(-1, nullgroup)
    }
}