const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const fcm = require('../lib/fcm')

const nullplan = require('../lib/type').plan()
const nulluser = require('../lib/type').user()

exports.createPlan = async (name, start_time, end_time, location, category, creator, gid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(
                queryStr.newPlan,
                [name, start_time, end_time, location, category, creator, gid, gid])

            db.release()

            if (queryResult.affectedRows == 0)
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

exports.editPlan = async (pid, name, start_time, end_time, location, category, gid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            let queryResult
            [queryResult] = await db.query(
                queryStr.editPlan,
                [name, start_time, end_time, location, category, pid, pid, gid, gid])
            
            if (gid !== undefined) {
                [queryResult] = await db.query(queryStr.updateGroupPlanBelongs, [pid, gid, gid])
            }
            else {
                [queryResult] = await db.query(queryStr.destroyGroupPlanBelongs, pid)
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
            console.log(err)
            return res.genericResponse(-1)
        }  
    } catch (err) {
        console.log(err)
        return res.genericResponse(-1)
    }
}

exports.invitePlan = async (pid, userid, target_userid_list) => {
    try {
        const db = await rds.getConnection()
        try {
            if (typeof target_userid_list == 'string') {
                const [targetResult] = await db.query(queryStr.getToken, [target_userid_list])
                const [inviterResult] = await db.query(queryStr.getNickname, [target_userid_list])
                const [inviterPlanResult] = await db.query(queryStr.getPlanName, pid)
                fcm.send(pid, 'plan', userid, inviterResult[0].nickName, inviterPlanResult[0].name, targetResult[0].token)

                const [queryResult] = await db.query(queryStr.invitePlan, [pid, target_userid_list, false])

                if (queryResult.affectedRows == 0)
                    throw 1
            }
            else {
                for (let target_userid of target_userid_list) {
                    const [targetResult] = await db.query(queryStr.getToken, [target_userid])
                    const [inviterResult] = await db.query(queryStr.getNickname, [target_userid])
                    const [inviterPlanResult] = await db.query(queryStr.getPlanName, pid)

                    fcm.send(pid, 'plan', userid, inviterResult[0].nickName, inviterPlanResult[0].name, targetResult[0].token)

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
        const db = await rds.getConnection()
        try {
            let queryResult

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
            const [queryResult] = await db.query(queryStr.deletePlan, [pid, pid, pid])
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
            
            const planinfo = require('../lib/type').plan(
                queryResult[0].pid,
                queryResult[0].name,
                queryResult[0].startTime,
                queryResult[0].endTime,
                queryResult[0].location,
                queryResult[0].category,
                queryResult[0].isPublic,
                queryResult[0].creator,
                queryResult[0].gid,
                queryResult[0].gname
            )

            return res.planResponse(0, planinfo)
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