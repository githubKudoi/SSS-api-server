// auth
exports.register = "insert into user (userId, password, nickName) values (?, ?, ?);"
exports.apiRegister = "insert into user (userId, nickname, apiId) values (?, ?, ?);"

// search user info
exports.searchUserid = "select userId from user where userId = ?;"
exports.matchPassword = "select userId from user where userId = ? AND password = ?;"
exports.searchNickname = "select nickName from user where nickName = ?;"
exports.getUserbyUserid = "select userId, nickName, if(isOnline, 'true', 'false') as isOnline, if(isAttend, 'true', 'false') as isAttend from user where userId = ?;"
exports.getUserbyNickname = "select userId, nickName, if(isOnline, 'true', 'false') as isOnline, if(isAttend, 'true', 'false') as isAttend from user where nickName = ?;"
exports.getNickname = "select nickName from `user` where userId = ?;"

// friend
exports.addFriend = "insert into friend (`userId`, `targetId`) select ?, ? from dual where not exists (select * from `blocks` where `userId` = ? and `targetId` = ?) and not exists (select * from `friendlist` where `origin_userId` = ? and `userId` = ?);"
exports.blockFriend = "delete from friend where userId = ? and targetId = ?; insert into blocks values (?, ?);"
exports.deleteFriend = "delete from friend where userId = ? and targetId = ?;"
exports.listFriend = "select userId, nickName, if(isOnline, 'true', 'false') as isOnline, if(isAttend, 'true', 'false') as isAttend from friendlist where origin_userId = ?;"
exports.setOnline = "update `user` set isOnline = true where userId = ?"
exports.setOffline = "update `user` set isOnline = false where userId = ?"

// group
exports.newGroup = "insert into `group` (name, explanation, color) values(?, ?, ?);" + "insert into `group_participation` values(?, last_insert_id(), true, true);"
exports.editGroup = "update `group` set name = ? , explanation = ?, color = ? where gid = ?"
exports.inviteGroup = "insert into group_participation (userId, gid) values (?, ?);"
exports.inviteGroupAccept = "update `group_participation` set isAccepted = true where userId = ? AND gid = ?"
exports.kickGroup = "delete from `group_participation` where gid = ? and userId = ?;"
exports.deleteGroup = "delete from `group` where gid=?; delete from `group_participation` where gid=?; delete from `group_plan_belongs` where gid=?;"
exports.listGroup = "select `group`.gid, name, explanation, color, userId as creator from `group` left outer join `group_participation` on `group`.gid = group_participation.gid where group_participation.userId=?;"
exports.detailsGroup = "select `group`.gid, name, explanation, color, userId as creator from `group` left outer join `group_participation` on `group`.gid = group_participation.gid where `group`.gid=?;"

// map
exports.getPopularity = ""
exports.setMyLocation = "update `plan_participation` set latitue=?, longitude=? where userId=?;"
exports.getLocation = "select `name`, `latitude`, `longitude` from `participant_coordination` where pid = ?;"

// memo
exports.newMemo = "update plan_participation set memo = ? where pid = ?;"
exports.deleteMemo = "update plan_participation set memo = null where pid = ?;"
exports.listMemo = "select memo from plan_participation where pid=?;"

// plan
exports.newPlan = "insert into plan (name, startTime, endTime, location, category) values(?, str_to_date(?, '%Y-%m-%d %H:%i:%s'), str_to_date(?, '%Y-%m-%d %H:%i:%s'), ?, ?);" + "insert into `plan_participation` (pid, userId) values(last_insert_id(), ?)"
exports.editPlan = "update `plan` set name=?, startTime=str_to_date(?, '%Y-%m-%d %H:%i:%s'), endTime=str_to_date(?, '%Y-%m-%d %H:%i:%s'), location=?, category=? where pid = ?;"
exports.invitePlan = "insert into plan_participation(pid, userId, isAccepted) values(?, ?, ?);"
exports.invitePlanAccept = "update plan_participation set isAccepted = true where userId = ? AND pid = ?"
exports.kickPlan = "delete from `plan_participation` where pid = ? and userId=?"
exports.completePlan = "update plan set isDone=true where pid = ?;"
exports.cancelPlan = "delete from plan_participation where userId=? and pid=?;"
exports.getAuthor = "select userId from plan_participation where plan_privilege=true AND pid=?"
exports.setPlanVisibility = "update plan set isPublic= ? where pid = ?;"
exports.deletePlan = "set sql_safe_updates = 0; delete from plan where pid=?; delete from plan_participation where pid=?; set sql_safe_updates = 1;" 
exports.listCurrentPlan = "select plan.pid, name, date_format(startTime, '%Y-%m-%d %H:%i:%s') as startTime, date_format(endTime, '%Y-%m-%d %H:%i:%s') as endTime, location, category, if(isPublic, 'true', 'false') as isPublic from plan left outer join plan_participation on plan_participation.pid = plan.pid where plan_participation.userId= ? and plan.isDone=false;"
exports.listPrevPlan = "select plan.pid, name, date_format(startTime, '%Y-%m-%d %H:%i:%s') as startTime, date_format(endTime, '%Y-%m-%d %H:%i:%s') as endTime, location, category, if(isPublic, 'true', 'false') as isPublic from plan left outer join plan_participation on plan_participation.pid = plan.pid where plan_participation.userId= ? and plan.isDone=false;"
exports.detailsPlan = "select plan.pid, name, date_format(startTime, '%Y-%m-%d %H:%i:%s') as startTime, date_format(endTime, '%Y-%m-%d %H:%i:%s') as endTime, location, category from plan where pid = ?"
exports.listParticipant = "select user.userId, nickName, if(isOnline, 'true', 'false') as isOnline, if(user.isAttend, 'true', 'false') as isAttend from user left outer join plan_participation on plan_participation.userId=user.userId where plan_participation.pid = ?"

// profile
exports.editProfile = "update user set nickName=?, name=? ,age=?,gender=? where userId=?"
exports.setNoticeOption = "update user set notice_push=? where userId=?"
exports.setInviteFriendOption = "update user set accept_invite_friend=? where userId=?"
exports.setInvitePlanOption = "update user set accept_plan_invite=? where userId=?"
exports.getOptions = "select `notice_push`, `accept_invite_friend`, `accept_plan_invite` from `user` where `userId` = ?;"
exports.logout = "update user set isOnline=false where userId=?;"
exports.getProfile = "select userId, nickName, age, gender from user where userId=?"
exports.getStats = "select `totalPlanCount`, `attendPlanCount`, `point` from `statistics` where `userId` = ?"
exports.getAvatar = "update `user` set `image` = ? where `userId` = ?"
exports.setAvatar = "select `image` from `user` where `userId` = ?"


// token
exports.getToken = "select token from user where userId = ?"
exports.setToken = "update user set token = ? where userId = ?"
exports.delToken = "delete from user where userId = ?"