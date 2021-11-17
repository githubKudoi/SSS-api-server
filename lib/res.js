exports.genericResponse = (code) => {
    return { 
        'code': code
    }
}
exports.planResponse = (code, planinfo) => {
    return {
        'code': code,
        'pid': planinfo.pid,
        'pname': planinfo.pname,
        'pdate': planinfo.pdate,
        'sTime': planinfo.sTime,
        'eTime': planinfo.eTime,
        'location': planinfo.location,
        'category': planinfo.category,
        'participants': planinfo.participants
    }
}
exports.memoResponse = (code, memo) => {
    return {
        'code': code,
        'memoinfo': memo
    }
}
exports.userResponse = (code, user) => {
    return {
        'code': code,
        'user': user
    }
}
exports.groupResponse = (code, group) => {
    return {
        'code': code,
        'group': group
    }
}
exports.profileResponse = (code, profile) => {
    return {
        'code': code,
        'profile': profile
    }
}

exports.ocrResponse = (code, recognizedStr) => {
    return {
        'code': code,
        'recognized': recognizedStr
    }
}
exports.statsResponse = (code, statsData) => {
    return {
        'code': code,
        'stats': statsData
    }
}
exports.popularityResponse = (code,popularity) => {
    return {
        'code': code,
        'latitude': popularity.coordination.latitude,
        'longitude': popularity.coordination.longitude,
        'count': popularity.count,
        'location-keyword': popularity.keyword
    }
}
exports.keywordResponse = (code, keyword) => {
    return {
        'code': code,
        'location-keyword': keyword
    }
}
exports.coordResponse = (code, coordination) => {
    return {
        'code': code,
        'latitude': coordination.latitude,
        'longitude': coordination.longitude
    }
}