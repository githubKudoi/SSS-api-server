const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const fcm = require('../lib/fcm')

const nullgroup = require('../lib/type').group

exports.createGroup = async (name, explanation, color, creator) => {
    try {
        const db = await rds.getConnection()
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
            console.log(err)
            return res.genericResponse(-1)
        }
    } catch (err) {
        console.log(err)
        return res.genericResponse(-1)
    }
}

exports.editGroup = async (gid, name, explanation, color) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.editGroup, [name, explanation, color, gid])
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

exports.inviteGroup = async (gid, userid, target_userid_list) => {
    try {
        const db = await rds.getConnection()
        try {
            if (typeof target_userid_list == 'string') {
                const [targetResult] = await db.query(queryStr.getToken, [target_userid_list])
                const [inviterResult] = await db.query(queryStr.getNickname, userid)
                const [inviterGroupResult] = await db.query(queryStr.getGroupName, gid)

                if (inviterGroupResult.length == 0)
                    throw 1

                fcm.send(gid, 'group', userid, inviterResult[0].nickName, inviterGroupResult[0].name, targetResult[0].token)
                
                const [queryResult] = await db.query(queryStr.inviteGroup, [target_userid_list, gid])
                
                if (queryResult.affectedRows == 0)
                    throw 1
            }
            else {
                for (let target_userid of target_userid_list) {
                    const [targetResult] = await db.query(queryStr.getToken, [target_userid])
                    const [inviterResult] = await db.query(queryStr.getNickname, [target_userid])
                    const [inviterGroupResult] = await db.query(queryStr.getGroupName, gid)
                    
                    fcm.send(gid, 'group', userid, inviterResult[0].nickName, inviterGroupResult[0].name, targetResult[0].token)

                    const [queryResult] = await db.query(queryStr.inviteGroup, [target_userid, gid])
                    
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

exports.inviteGroupAccept = async (userid, gid, is_accepted) => {
    try {
        const db = await rds.getConnection()
        try {
            let queryResult
            if (is_accepted == 'false') {
                [queryResult] = await db.query(queryStr.kickGroup, [gid, userid])
            }
            else {
                [queryResult] = await db.query(queryStr.inviteGroupAccept, [userid, gid])
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

exports.kickGroup = async (gid, target_userid_list) => {
    try {
        const db = await rds.getConnection()
        try {
            if (typeof target_userid_list == 'string') {
                const [queryResult] = await db.query(queryStr.kickGroup, [gid, target_userid_list])
            
            
                if (queryResult.affectedRows == 0)
                    throw 1
            }
            else {
                for (let target_userid in target_userid_list) {
                    const [queryResult] = await db.query(queryStr.kickGroup, [gid, target_userid])
                
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

exports.exitGroup = async (userid, gid) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.exitGroup, [gid, userid, userid, gid])
        
            if (queryResult.affectedRows == 0)
                throw 1

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

exports.deleteGroup = async (gid) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.deleteGroup, [gid, gid, gid])
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

exports.listGroup = async (userid) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.listGroup, userid)
            db.release()

            return res.groupResponse(0, queryResult)
        } catch (err) { 
            db.release()
            console.log(err)
            return res.groupResponse(-1, nullgroup)
        }
    } catch (err) {
        console.log(err)
        return res.groupResponse(-1, nullgroup)
    }
}

exports.detailsGroup = async (gid) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.detailsGroup, gid)
            db.release()

            if (queryResult.length == 0)
                throw 1

            return res.groupResponse(0, queryResult[0])
        } catch (err) { 
            db.release()
            if (err == 1) {
                console.log("No group details")
                return res.groupResponse(1, nullgroup)
            }
            console.log(err)
            return res.groupResponse(-1, nullgroup)
        }
    } catch (err) {
        console.log(err)
        return res.groupResponse(-1, nullgroup)
    }
}