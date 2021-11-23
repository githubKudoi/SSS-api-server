const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const express = require('express')

const googleDistanceApiConfig = require('../lib/config/googlemap').config
const google = require('google-distance-matrix')

exports.popularity = async () => {
    // 데이터분석
}

exports.keyword = async (longitude, latitude) => {
    // 좌표값 입력받아 해당 지명 구함
}

exports.myLocation = async (longitude, latitude) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.setMyLocation, [longitude, latitude])
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
            console.log("Query error")
            return res.coordResponse(-1, null)
        }
    } catch (err) {
        console.log("DB error")
        return res.coordResponse(-1, null)
    }
}

exports.location = async (pid) => {
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.getLocation, pid)
            db.release()

            if (queryResult.length == 0)
                throw 1

            return res.coordResponse(0, queryResult)
        } catch (err) { 
            db.release()
            if (err == 1) {
                console.log("No location")
                return res.coordResponse(1, null)
            }
            console.log("Query error")
            return res.coordResponse(-1, null)
        }
    } catch (err) {
        console.log("DB error")
        return res.coordResponse(-1, null)
    }
}

exports.eta = async (start_latitude, start_longitude, destination_latitude, destination_longitude) => {
    try {
        /*
        const reqestUrl = googleDistanceApiConfig.url +
        "origins=" + start_latitude + "," + start_longitude +
        "&destinations=" + destination_latitude + "," + destination_longitude +
        "&region=" + googleDistanceApiConfig.region +
        "&key=" + googleDistanceApiConfig.key

        const app = express()
        app.use(express.urlencoded({extended: false}))
        app.get(reqestUrl, (req, res) => {
            console.log("result: " + JSON.stringify(res))
            console.log("result: " + res)
        })

        

        if (result.status != 'OK')
            throw result.error_message
        
        console.log(result.rows.elements.duration.text)
        return res.timeResponse(0, result.rows.elements.duration.text)
        */

        const origin = [35.870788, 128.595515]
        const destination = [35.870366, 128.598569]
        google.key(googleDistanceApiConfig.key)
        google.language(googleDistanceApiConfig.region)
        const result = google.matrix(origin, destination)

        console.log(result)
    } catch (err) {
        console.log(err)
        return res.timeResponse(-1)
    }
}