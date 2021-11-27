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
        'creator': creator
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
        'group': group,
        'sync': false
    }
}

exports.memo = (text, writer) => {
    return {
        'memo': text,
        'writer': writer
    }
}

exports.stats = (totalPlanCount, attendPlanCount, point) => {
    return {
        totalPlanCount,
        attendPlanCount,
        point
    }
}

exports.coordination = (longitude, latitude) => {
    return {
        longitude,
        latitude
    }
}

exports.options = (notice_option, friend_invite_option, plan_invite_option) => {
    return {
        notice_option,
        friend_invite_option,
        plan_invite_option
    }
}