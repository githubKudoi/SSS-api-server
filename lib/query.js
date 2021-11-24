exports.register = "insert into user (userid, password, nickname, point) values (?, ?, ?, ?)"
exports.searchUserid = "select userid from user where userid = ?"
exports.matchPassword = "select userid from user where userid = ? AND password = ?"
exports.searchNickname = "select nickname from user where nickname = ?"
exports.getUser = "select * from user where userid = ?"
exports.getNickname = "select nickname user where userid = ?"

exports.searchUname = "select nickname from user where nickname = ?"            // 사용자 닉네임 -> 닉네임 으로 검색
exports.addFriend = "insert into friend values (?, ?)"              // 사용자 id, 대상자 id -> 친구 추가
exports.blockFriend = "insert into blocks values (?, ?)"            // 사용자 id, 대상자 id -> 친구 차단
exports.deleteFriend = "delete from friend where userid = ? and targetid = ?"           // 사용자 id, 대상자 id -> 친구 삭제
exports.listFriend = " select user.userid, nickname, isOnline, isAttend from user left outer join friend on user.userid = friend.targetid where friend.userid = ?"             // 사용자 id -> 사용자의 친구들 리스트 리턴

exports.newGroup = "insert into `group` values(?, ?, ?, ?)"               // 그룹 이름, 설명, 인원, 그룹 색상 -> 생성
exports.editGroup = "update `group` set group_name = ? , explanation = ?, number_of_people = ?, color = ? where gid = ?"              // 그룹 id, 그룹 이름, 설명, 인원, 그룹 색상 -> 수정
exports.inviteGroup = "insert into group_participation values (?, ?, ?, ?);"            // 그룹 id, 사용자 리스트 -> 대상 사용자들 초대
exports.inviteGroupAccept = "update `group_participation` set is_Accepted = ? where userid = ? AND gid = ?"
exports.kickGroup = "delete from group_participation where gid = ? and userid = ?;"              // 그룹 id, 사용자 리스트 -> 대상 사용자들 강퇴
exports.deleteGroup = "delete from `group`,group_participation,group_plan_belongs where gid=?;"            // 그룹 id -> 대상 그룹 삭제
exports.listGroup = "select group_name from `group` left outer join group_participation on `group`.gid = group_participation.gid where group_participation.userid=?;"              // 사용자 id -> 사용자의 그룹 리스트 리턴
exports.detailsGroup = "select group_name, color, number_of_people, explanation from `group`where gid=?;"           // 그룹 id -> 대상 그룹 세부정보 리턴

exports.getPopularity = ""          // 나중에
exports.setMyLocation = "update plan_participation set user_latitue=?, user_hardness=? where userid=?;"          // 사용자 id, 위도, 경도 -> 사용자 현재 위치 저장
exports.getLocation = "select name, user_latitue, user_hardness from user join plan_participation on plan_participation.userid = user.userid where plan_participation.userid=? and pid=?;"            // 사용자 id, 약속 id -> 사용자들 이름과 위치 리턴

exports.newMemo = "insert into plan_participation(userid, pid, memo) values(?,?,?);"                // 사용자 id, 약속 id, 메모 내용 -> 메모 생성
exports.deleteMemo = "delete from plan_participation where userid=? and pid=?;"             // 사용자 id, 약속 id -> 해당 약속의 메모 삭제
exports.listMemo = "select memo from plan_participation where pid=?;"               // 사용자 id, 약속 id -> 해당 약속 메모 리스트 리턴

exports.newPlan = "insert into plan(planname, date, start_time, end_time, place_name, category) values(?,?,?,?,?,?)"                // 약속 이름, 날짜, 시작시간, 종료시간, 장소, 카테고리, 주최자 id -> 약속 생성
exports.editPlan = "update plan set planname=?, date=?, start_time=?,end_time=?,place_name=?,category=?;"               // 약속 이름, 날짜, 시작시간, 종료시간, 장소, 카테고리 -> 내용 수정
exports.invitePlan = "insert into plan_participation(pid, userid, is_accepted) values(?, ?, ?);"             // 약속 id, 대상 사용자 리스트 -> 약속 초대(약속과 link)
exports.invitePlanAccept = "update plan set is_accepted = ? where userid = ? AND pid = ?"             // 약속 id, 대상 사용자 리스트 -> 약속 초대(약속과 link)
exports.kickPlan = "delete from plan_participation where pid=? and userid=?"               // 약속 id, 대상 사용자 리스트 -> 약속 강퇴처리
exports.completePlan = "update plan set is_done=1 where pid=?;"           // 사용자 id, 약속 id -> 약속 완료처리
exports.cancelPlan = "delete from plan_participation where userid=? and pid=?;"             // 사용자 id, 약속 id -> 약속 취소처리
exports.setPlanVisibility = "update plan_participation set is_public=1 where userid=? and pid=?;"          // 사용자 id, 약속 id -> 약속 공개/비공개 처리
exports.deletePlan = "delete from plan where pid=?;"             // 약속 id -> 약속 삭제 처리
exports.listCurrentPlan = "select * from plan left outer join plan_participation on plan_participation.pid = plan.pid where plan_participation.userid= ? and plan.is_done=false;"        // 사용자 id -> 현재 약속 리스트
exports.listPrevPlan = "select pid, planname, date, start_time, end_time, place_name, category from plan left outer join plan_participation on plan_participation.pid = plan.pid where plan_participation.userid=? and plan.is_done=true;"           // 사용자 id -> 이전 약속 리스트
exports.detailsPlan = "select * from plan where pid=?"            // 약속 id -> 현재 약속 세부정보
exports.listParticipant = "select user.userid, nickname, isOnline, isAttend from user left outer join plan_participation on plan_participation.userid=user.userid where plan_participation.pid=?"        // 약속 id -> 참여자 리스트

exports.newProfile = "insert into user(name,age,gender,profile_image) values(?,?,?,?,?,?)"             // 사용자 id, 별명, 실명, 나이, 성별, 사진 -> 신규 생성
exports.editProfile = "update user set nickname=?,name=?,age=?,gender=?,profile_image=? where userid=?"            // 사용자 id, 별명, 실명, 나이, 성별, 사진 -> 수정
exports.setNoticeOption = "update user set on_notice=? where userid=?"        // 사용자 id, boolean -> 설정 처리
exports.setInviteFriendOption = "update user set on_invite_friend=? where userid=?"  // 사용자 id, boolean -> 설정 처리
exports.setInvitePlanOption = "update user set on_invite_plan=? where userid=?"    // 사용자 id, boolean -> 설정 처리
exports.logout = "update user set isOnline=false where userid=?;"                 // 사용자 id -> logout 처리
exports.getProfile = "select userid,nickname,age,profile_image,login_method,point,gender from user where userid=?"             // 사용자 id -> profile 리턴
exports.getStats = ""               // 데이터분석 이후에

exports.getToken = "select token from user where userid = ?"
exports.setToken = "update user set token = ? where userid = ?"