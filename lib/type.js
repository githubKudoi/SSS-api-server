exports.user = (userid, nickname, isOnline, isAttend) => {
    return {
        'userId': userid,
        'nickName': nickname,
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
exports.profile = (userid, nickname, username, age, gender) => {
    return {
        'userid': userid,
        'nickname': nickname,
        'username': username,
        'age': age,
        'gender': gender
    }
}

exports.plan = (pid, name, startTime, endTime, location, category, isPublic, creator, participants, group) => {
    return {
        'pid': pid,
        'name': name,
        'startTime': startTime,
        'endTime': endTime,
        'location': location,
        'category': category,
        'isPublic': isPublic,
        'creator': creator,
        'participants': participants,
        'group': group,
        'sync': false
    }
}

exports.memo = (text, pid, writer) => {
    return {
        'memo': text,
        'pid': pid,
        'writer': writer
    }
}

exports.coordination = (longitude, latitude) => {
    return {
        'longitude': longitude,
        'latitude': latitude
    }
}