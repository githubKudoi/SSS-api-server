const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const type = require('../lib/type')
const axios = require('axios')

const googleDistanceApiConfig = require('../lib/config/googlemap').config

exports.popularity = async () => {
    // 데이터분석
}

exports.keyword = async (latitude, longitude) => {
    // 좌표값 입력받아 해당 지명 구함
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

exports.location = async (pid) => { // eta랑 합치기
    const nulluserLocation = type.userLocation()
    try {
        const db = await rds.getConnection(async conn => conn)
        try {
            const [queryResult] = await db.query(queryStr.getLocation, [pid])
            db.release()

            return res.coordResponse(0, queryResult)
        } catch (err) { 
            db.release()
            console.log(err)
            return res.coordResponse(-1, nulluserLocation)
        }
    } catch (err) {
        console.log(err)
        return res.coordResponse(-1, nulluserLocation)
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