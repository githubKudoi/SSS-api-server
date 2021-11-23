const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const datatype = require('../lib/type')

exports.createMemo = async (userid, pid, memo) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.newMemo, [userid, pid, memo])
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

exports.deleteMemo = async (userid, pid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.deleteMemo, [userid, pid])
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

exports.listMemo = async (pid) => {
    const nullmemo = datatype.memo(null)
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.listMemo, pid)
            db.release()

            return res.memoResponse(0, queryResult)
        } catch (err) { 
            db.release()
            console.log("Query error")
            return res.planResponse(-1, nullmemo)
        }
    } catch (err) {
        console.log("DB error")
        return res.planResponse(-1, nullmemo)
    }
}