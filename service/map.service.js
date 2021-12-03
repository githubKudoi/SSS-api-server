const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const axios = require('axios')
const httpRequest = require('request')
const kakao = require('../lib/config/kakaomap')
const type = require('../lib/type')

let locationList = []
const nullCoordination = require('../lib/type').coordination()

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

exports.myLocation = async (userid, latitude, longitude) => {
    try {
        const db = await rds.getConnection()
        try {
            const [queryResult] = await db.query(queryStr.setMyLocation, [latitude, longitude, userid])
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

exports.location = async (pid) => {
    try {
        const db = await rds.getConnection()
        try {
            let parsedBody = ''
            const [placenameResult] = await db.query(queryStr.getPlace, [pid])
            const [coordinationResult] = await db.query(queryStr.getLocation, [pid])
            db.release()
            
            if (coordinationResult.length === 0)
                throw 0
            
            for (coord of coordinationResult) {
                const kakaoPlaceOptions = kakao.kakaoPlaceOptions(placenameResult[0])
                
                httpRequest(kakaoPlaceOptions, (err, res, body) => {
                    if (!err && res.statusCode === 200) {
                        parsedBody = JSON.parse(body)
                        let eta = ''
                        const kakaoEtaOptions = kakao.kakaoEtaOptions(
                            coord.longitude,
                            coord.latitude,
                            parsedBody.documents[0].x,
                            parsedBody.documents[0].y)

                        httpRequest(kakaoEtaOptions, (err, res, body) => {
                            if (!err && res.statusCode === 200) {
                                parsedBody = JSON.parse(body)
                                
                                let minute = Math.floor((parsedBody.routes[0].summary.duration / 60) % 60)
                                let time = Math.floor(parsedBody.routes[0].summary.duration / 3600)

                                if (time > 0)
                                    eta = time + "시간 " + minute + "분"
                                else
                                    eta = minute + "분"

                                locationList.push(type.location(
                                    coord.nickName,
                                    coord.latitude,
                                    coord.longitude,
                                    eta))
                                }
                            else
                            console.log(body)
                        })
                    }
                })
            }

            const locationResult = locationList
            locationList = []
            return res.locationResponse(0, locationResult)
        } catch (err) { 
            db.release()
            return res.locationResponse(0, nullCoordination)
        }
    } catch (err) {
        console.log(err)
        return res.locationResponse(-1, nullCoordination)
    }
}

exports.eta = async (start_latitude, start_longitude, destination_latitude, destination_longitude) => {
    try {
        const reqestUrl = googleDistanceApiConfig.url +
        "origins=" + start_latitude + "," + start_longitude +
        "&destinations=" + destination_latitude + "," + destination_longitude +
        "&region=" + googleDistanceApiConfig.region +
        "&key=" + googleDistanceApiConfig.key

        const result = axios.get(reqestUrl)
        
        if(result.data.status !== 'OK')
            throw result.data.error_message

        return res.timeResponse(0, result.data.rows[0].elements[0].duration.text)
    } catch (err) {
        console.log(err)
        return res.timeResponse(-1)
    }
}