const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const type = require('../lib/type')
const axios = require('axios')

const googleDistanceApiConfig = require('../lib/config/googlemap').config

exports.popularity = async (userid, response) => {
    const { spawn } = require('child_process')
    const pyProg = spawn('python3', ['lib/main.py', 'user777', 5])

    let name = []
    let dataToSend

    pyProg.stdout.on('data', (data) => {
        dataToSend = data.toString()
    })
    pyProg.on('close', (code) => {
        name = dataToSend.split('\n')
        name.pop()

        response.json(res.placeResponse(0, name))
    })
}

exports.myLocation = async (latitude, longitude) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.setMyLocation, [latitude, longitude])
            db.release()

            if (queryResult.affectedRows == 0)
                throw 1

            return res.coordResponse(0, queryResult)
        } catch (err) { 
            db.release()
            if (err == 1) {
                console.log("Nothing affected")
                return res.coordResponse(1, null)
            }
            console.log(err)
            return res.coordResponse(-1, null)
        }
    } catch (err) {
        console.log(err)
        return res.coordResponse(-1, null)
    }
}

exports.location = async (userid, pid, latitude, longitude) => { // eta랑 합치기
    try {
        const db = await rds.getConnection()
        try {
            const [coordinationResult] = await db.query(queryStr.getLocation, [pid])
            if (queryResult.length == 0)
                throw 1
            
            const [queryResult] = await db.query(queryStr.setMyLocation, [latitude, longitude, userid])
            if (coordinationResult.affectedRows == 0)
                throw 1
            
            db.release()

            return res.coordResponse(0, coordinationResult[0])
        } catch (err) { 
            db.release()
            console.log(err)
            return res.coordResponse(0, null)
        }
    } catch (err) {
        console.log(err)
        return res.coordResponse(-1, null)
    }
}

exports.eta = async (start_latitude, start_longitude, destination_latitude, destination_longitude) => {
    try {
        const reqestUrl = googleDistanceApiConfig.url +
        "origins=" + start_latitude + "," + start_longitude +
        "&destinations=" + destination_latitude + "," + destination_longitude +
        "&region=" + googleDistanceApiConfig.region +
        "&key=" + googleDistanceApiConfig.key

        const result = await axios.get(reqestUrl)
        
        if(result.data.status !== 'OK')
            throw result.data.error_message

        return res.timeResponse(0, result.data.rows[0].elements[0].duration.text)
    } catch (err) {
        console.log(err)
        return res.timeResponse(-1)
    }
}