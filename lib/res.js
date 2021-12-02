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
        memo
    }
}
exports.userResponse = (code, user) => {
    return {
        code,
        user
    }
}
exports.groupResponse = (code, group, personnel) => {
    return {
        code,
        group,
        personnel
    }
}
exports.profileResponse = (code, profile) => {
    return {
        code,
        profile
    }
}

exports.statsResponse = (code, statistics) => {
    return {
        code,
        statistics
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
        time
    }
}

exports.imageResponse = (code, image) => {
    return {
        code,
        image
    }
}

exports.optionsResponse = (code, options) => {
    return {
        code,
        options
    }
}

exports.locationResponse = (code, location) => {
    return {
        code,
        location
    }
}

exports.placeResponse = (code, name) => {
    return {
        code,
        'name': name
    }
}