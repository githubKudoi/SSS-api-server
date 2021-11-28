const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')

const nullmemo = require('../lib/type').memo()

exports.createMemo = async (userid, pid, memo) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.newMemo, [memo, pid, userid])
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

exports.deleteMemo = async (userid, pid) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.deleteMemo, [pid])
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

exports.listMemo = async (pid) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.listMemo, pid)
            db.release()
            
            return res.memoResponse(0, queryResult)
        } catch (err) { 
            db.release()
            console.log(err)
            return res.planResponse(-1, nullmemo)
        }
    } catch (err) {
        console.log(err)
        return res.planResponse(-1, nullmemo)
    }
}