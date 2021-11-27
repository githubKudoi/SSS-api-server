const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')

const nullplan = require('../lib/type').plan()
const nulluser = require('../lib/type').user()

exports.createPlan = async (name, start_time, end_time, location, category, creator) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(
                queryStr.newPlan,
                [name, start_time, end_time, location, category, creator])
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

exports.editPlan = async (pid, name, start_time, end_time, location, category) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(
                queryStr.editPlan,
                [name, start_time, end_time, location, category, pid])
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
            if (typeof target_userid_list == 'string') {
                const [targetResult] = await db.query(queryStr.getToken, [target_userid_list])
                const [inviterResult] = await db.query(queryStr.getNickname, [target_userid_list])

                // fcm.send('plan', userid, inviterResult.nickName, target_userid_list, targetResult.token)

                const [queryResult] = await db.query(queryStr.invitePlan, [pid, target_userid_list, false])

                if (queryResult.affectedRows == 0)
                    throw 1
            }
            else {
                for (let target_userid of target_userid_list) {
                    const [targetResult] = await db.query(queryStr.getToken, [target_userid])
                    const [inviterResult] = await db.query(queryStr.getNickname, [target_userid])

                    // fcm.send('plan', userid, inviterResult.nickName, target_userid, targetResult.token)

                    const [queryResult] = await db.query(queryStr.invitePlan, [pid, target_userid, false])

                    if (queryResult.affectedRows == 0)
                        throw 1
                }
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

exports.invitePlanAccept = async (pid, userid, is_accepted) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            if (is_accepted == 'false') {
                [queryResult] = await db.query(queryStr.kickPlan, [pid, userid])
            }
            else {
                [queryResult] = await db.query(queryStr.invitePlanAccept, [userid, pid])
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
            if (typeof target_userid_list == 'string') {
                const [queryResult] = await db.query(queryStr.kickPlan, [pid, target_userid_list])
                
                if (queryResult.affectedRows == 0)
                    throw 1
            }
            else {
                for (let [target_userid] of target_userid_list) {
                    const [queryResult] = await db.query(queryStr.kickPlan, [pid, target_userid])
                    
                    if (queryResult.affectedRows == 0)
                        throw 1
                }
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

exports.completePlan = async (pid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.completePlan, pid)
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
            let queryResult
            if (visibility == 'true')
                [queryResult] = await db.query(queryStr.setPlanVisibility, [true, pid])
            else
                [queryResult] = await db.query(queryStr.setPlanVisibility, [false, pid])
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
            const [queryResult] = await db.query(queryStr.deletePlan, [pid, pid])
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
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            let queryResult
            if (is_current == 'true')
                [queryResult] = await db.query(queryStr.listCurrentPlan, [userid])
            else
                [queryResult] = await db.query(queryStr.listPrevPlan, [userid])
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
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.detailsPlan, pid)
            db.release()

            if (queryResult.length == 0)
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