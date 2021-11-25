exports.genericResponse = (code) => {
    return { 
        code
    }
}
exports.planResponse = (code, plan) => {
    return {
        code,
        plan
    }
}
exports.memoResponse = (code, memo) => {
    return {
        code,
        'memoinfo': memo
    }
}
exports.userResponse = (code, user) => {
    return {
        code,
        user
    }
}
exports.groupResponse = (code, group) => {
    return {
        code,
        group
    }
}
exports.profileResponse = (code, profile) => {
    return {
        code,
        profile
    }
}

exports.ocrResponse = (code, recognizedStr) => {
    return {
        code,
        'recognized': recognizedStr
    }
}
exports.statsResponse = (code, statsData) => {
    return {
        code,
        'stats': statsData
    }
}
exports.popularityResponse = (code,popularity) => {
    return {
        code,
        'latitude': popularity.coordination.latitude,
        'longitude': popularity.coordination.longitude,
        'count': popularity.count,
        'location-keyword': popularity.keyword
    }
}
exports.keywordResponse = (code, keyword) => {
    return {
        code,
        'location-keyword': keyword
    }
}
exports.coordResponse = (code, coordination) => {
    return {
        code,
        'latitude': coordination.latitude,
        'longitude': coordination.longitude
    }
}

exports.timeResponse = (code, time) => {
    return {
        code,
        'time': time
    }
}