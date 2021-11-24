exports.user = (userid, username, isOnline, isAttend) => {
    return {
        'userid': userid,
        'username': username,
        'isOnline': isOnline,
        'isAttend': isAttend
    }
}
exports.group = (gid, name, explanation, color, creator, user) => {
    return {
        'gid': gid,
        'name': name,
        'explanation': explanation,
        'color': color,
        'creator': creator,
        'participants': user
    }
}   
exports.profile = (userid, nickname, username, age, gender, image) => {
    return {
        'userid': userid,
        'nickname': nickname,
        'username': username,
        'age': age,
        'gender': gender,
        'image': image
    }
}

exports.plan = (pid, name, startTime, endTime, location, category, creator, participants, group) => {
    return {
        'pid': pid,
        'name': name,
        'startTime': startTime,
        'endTime': endTime,
        'location': location,
        'category': category,
        'creator': creator,
        'participants': participants,
        'group': group,
        'sync': false
    }
}

exports.memo = (text) => {
    return {
        'memo': text
    }
}

exports.coordination = (longitude, latitude) => {
    return {
        'longitude': longitude,
        'latitude': latitude
    }
}