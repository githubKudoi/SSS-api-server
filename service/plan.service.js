const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const datatype = require('../lib/type')

exports.createPlan = async (name, date, start_time, end_time, location, category, creator) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(
                queryStr.newPlan,
                [name, date, start_time, end_time, location, category, creator])
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

exports.editPlan = async (name, date, start_time, end_time, location, category) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(
                queryStr.editPlan,
                [name, date, start_time, end_time, location, category])
                db.release()

            if (queryResult.affectedRows == 0)
                throw 1

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

exports.invitePlan = async (pid, target_userid_list) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            for (let target_userid in target_userid_list) {
                const [targetResult] = await db.query(queryStr.getToken, [target_userid])
                const [inviterResult] = await db.query(queryStr.getNickname, [userid])
                fcm.send('plan', userid, inviterResult[0].nickname, target_userid, targetResult[0].token)

                const [queryResult] = await db.query(queryStr.invitePlan, [target_userid, gid, 0])

                if (queryResult.affectedRows == 0)
                    throw 1
            }
            db.release()

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

exports.invitePlanAccept = async (pid, is_accepted) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            if (!is_accepted) {
                [queryResult] = await db.query(queryStr.kickPlan, [pid, userid])
            }
            else {
                [queryResult] = await db.query(queryStr.invitePlanAccept, [1, userid, pid])
            }
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

exports.kickPlan = async (pid, target_userid_list) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.kickPlan, [pid, target_userid_list])
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

exports.completePlan = async (pid, userid) => { // 자동완료 구현 필요
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.completePlan, [userid, pid])
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

exports.cancelPlan = async (pid, userid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.cancelPlan, [userid, pid])
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

exports.publicPlan = async (pid, visibility) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.setPlanVisibility, [pid, visibility])
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

exports.deletePlan = async (pid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.deletePlan, pid)
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

exports.listPlan = async (userid, is_current) => {
    const nullplan = datatype.plan()
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            let queryResult
            if (is_current)
                [queryResult] = await db.query(queryStr.listCurrentPlan, userid)
            else
                [queryResult] = await db.query(queryStr.listPrevPlan, userid)
            db.release()

            return res.planResponse(0, queryResult)
        } catch (err) { 
            db.release()
            console.log("Query error")
            return res.planResponse(-1, nullplan)
        }
    } catch (err) {
        console.log("DB error")
        return res.planResponse(-1, nullplan)
    }
}

exports.detailsPlan = async (pid) => {
    const nullplan = datatype.plan()
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.detailsPlan, pid)
            db.release()

            if (queryResult.length == 0)
                throw 1

            return res.planResponse(0, queryResult)
        } catch (err) { 
            db.release()
            if (err == 1) {
                console.log("Nothing affected")
                return res.planResponse(1, nullplan)
            }
            console.log("Query error")
            return res.planResponse(-1, nullplan)
        }
    } catch (err) {
        console.log("DB error")
        return res.planResponse(-1, nullplan)
    }
}

exports.partlist = async (pid) => {
    const nulluser = datatype.user()
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.listParticipant, pid)
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