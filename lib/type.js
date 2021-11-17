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