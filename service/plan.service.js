const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const type = require('../lib/type')

exports.createPlan = async (name, start_time, end_time, location, category, creator) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            console.log(name, start_time, end_time, location, category, creator)

            const [queryResult] = await db.query(
                queryStr.newPlan,
                [name, start_time, end_time, location, category,
                    name, start_time, end_time, location, creator])
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
            console.log(err)
            return res.genericResponse(-1)
        }
    } catch (err) {
        console.log(err)
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
            console.log(err)
            return res.genericResponse(-1)
        }
    } catch (err) {
        console.log(err)
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

exports.completePlan = async (pid, userid) => {
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
        console.log(err)
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
        console.log(err)
        return res.genericResponse(-1)
    }
}

exports.publicPlan = async (pid, visibility) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.setPlanVisibility, [visibility, pid])
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
            console.log(err)
            return res.genericResponse(-1)
        }
    } catch (err) {
        console.log(err)
        return res.genericResponse(-1)
    }
}

exports.listPlan = async (userid, is_current) => {
    const nullplan = type.plan()
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            let queryResult
            if (is_current) // 쿼리문 수정 필요. 현재/지난 약속
                [queryResult] = await db.query(queryStr.listCurrentPlan, [userid, false])
            else
                [queryResult] = await db.query(queryStr.listPrevPlan, [userid, false])
            db.release()

            return res.planResponse(0, queryResult)
        } catch (err) { 
            db.release()
            console.log(err)
            return res.planResponse(-1, nullplan)
        }
    } catch (err) {
        console.log(err)
        return res.planResponse(-1, nullplan)
    }
}

exports.detailsPlan = async (pid) => {
    const nullplan = type.plan()
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.detailsPlan, pid)
            db.release()

            if (queryResult == undefined)
                throw 1

            return res.planResponse(0, queryResult[0])
        } catch (err) { 
            db.release()
            if (err == 1) {
                console.log("Nothing affected")
                return res.planResponse(1, nullplan)
            }
            console.log(err)
            return res.planResponse(-1, nullplan)
        }
    } catch (err) {
        console.log(err)
        return res.planResponse(-1, nullplan)
    }
}

exports.partlist = async (pid) => {
    const nulluser = type.user()
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.listParticipant, pid)
            db.release()

            return res.userResponse(0, queryResult)
        } catch (err) { 
            db.release()
            console.log(err)
            return res.userResponse(-1, nulluser)
        }
    } catch (err) {
        console.log(err)
        return res.userResponse(-1, nulluser)
    }
}