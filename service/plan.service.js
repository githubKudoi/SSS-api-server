const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')

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

exports.invitePlan = async (pid, target_userid_list) => { // 푸시알림 미구현
    try {
        // 푸시알림 코드

        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.invitePlan, [pid, target_userid_list])
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

exports.publicPlan = async (pid, userid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.publicPlan, [userid, pid])
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
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            if (is_current)
                const [queryResult] = await db.query(queryStr.listCurrentPlan, userid)
            else
                const [queryResult] = await db.query(queryStr.listPrevPlan, userid)
            db.release()

            return res.planResponse([queryResult])
        } catch (err) { 
            db.release()
            console.log("Query error")
            return res.planResponse()
        }
    } catch (err) {
        console.log("DB error")
        return res.planResponse()
    }
}

exports.detailsPlan = async (pid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.detailsPlan, pid)
            db.release()

            if (queryResult.length == 0)
                throw -1

            return res.planResponse(queryResult)
        } catch (err) { 
            db.release()
            console.log("Query error")
            return res.planResponse()
        }
    } catch (err) {
        console.log("DB error")
        return res.planResponse()
    }
}

exports.partlist = async (pid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.listParticipant, pid)
            db.release()

            return res.userResponse(queryResult)
        } catch (err) { 
            db.release()
            console.log("Query error")
            return res.userResponse()
        }
    } catch (err) {
        console.log("DB error")
        return res.userResponse()
    }
}