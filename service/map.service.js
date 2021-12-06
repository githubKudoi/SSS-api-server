const rds = require('../lib/config/db')
const queryStr = require('../lib/query')
const res = require('../lib/res')
const httpRequest = require('request')
const axios = require('axios')
const kakao = require('../lib/config/kakaomap')
const type = require('../lib/type')

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
            const locationList = []
            let parsedBody = ''
            let kakaoEtaOptions = ''
            const [placenameResult] = await db.query(queryStr.getPlace, [pid])
            const [coordinationResult] = await db.query(queryStr.getLocation, [pid])
            db.release()
            
            if (coordinationResult.length === 0)
                throw 0

            const kakaoPlaceOptions = kakao.kakaoPlaceOptions(placenameResult[0].location)
            
            httpRequest(kakaoPlaceOptions, (err, res, body) => {
                if (!err && res.statusCode === 200) {
                    parsedBody = JSON.parse(body)
                    let eta = ''
            
                    for (let coord of coordinationResult) {
                        kakaoEtaOptions = kakao.kakaoEtaOptions(
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

                                let location = type.location(
                                    coord.nickName,
                                    coord.latitude,
                                    coord.longitude,
                                    eta)
                                locationList.push(location)
                                }
                            else {
                                throw body
                            }
                        })
                        console.log(locationList)
                    }
                }
            })
            const locationResult = locationList.slice()
            locationList.splice(0, locationList.length)
            console.log(res.locationResponse(0, locationResult))
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