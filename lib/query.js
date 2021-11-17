/*
    그룹 테이블에 그룹 최대 인원 애트리뷰트 삭제
    searchUserid ~ register 테스트때 썼던건데, 지금 테이블에서 사용하는 애트리뷰트들이랑 이름 통일되는지 확인
    
*/

exports.searchUserid = "SELECT * FROM user WHERE userid = ?"
exports.matchUserid = "SELECT userid FROM user WHERE userid = ?"
exports.matchPassword = "SELECT userid FROM user WHERE userid = ? AND password = ?"
exports.getUserCount = "SELECT count(*) FROM user"
exports.register = "INSERT INTO user VALUES (?, ?, ?)"

exports.searchNickname = ""         // 사용자 별명 -> 이름으로 검색
exports.addFriend = ""              // 사용자 id, 대상자 id -> 친구 추가
exports.blockFriend = ""            // 사용자 id, 대상자 id -> 친구 차단
exports.deleteFriend = ""           // 사용자 id, 대상자 id -> 친구 삭제
exports.listFriend = ""             // 사용자 id -> 사용자의 친구들 리스트 리턴

exports.newGroup = ""               // 그룹 이름, 설명, 색상, 생성자 -> 생성
exports.editGroup = ""              // 그룹 id, 그룹 이름, 설명, 색상, 생성자 -> 수정
exports.inviteGroup = ""            // 그룹 id, 사용자 id 리스트 -> 대상 사용자들 초대
exports.kickGroup = ""              // 그룹 id, 사용자 id 리스트 -> 대상 사용자들 강퇴
exports.deleteGroup = ""            // 그룹 id -> 대상 그룹 삭제
exports.listGroup = ""              // 사용자 id -> 사용자의 그룹 리스트 리턴
exports.detailsGroup = ""           // 그룹 id -> 대상 그룹 세부정보 리턴

exports.getPopularity = ""          // 나중에
exports.setMyLocation = ""          // 사용자 id, 위도, 경도 -> 사용자 현재 위치 저장
exports.getLocation = ""            // 사용자 id, 약속 id -> 사용자들 이름과 위치 리턴

exports.newMemo = ""                // 사용자 id, 약속 id, 메모 내용 -> 메모 생성
exports.deleteMemo = ""             // 사용자 id, 약속 id -> 해당 약속의 메모 삭제
exports.listMemo = ""               // 사용자 id, 약속 id -> 해당 약속 메모 리스트 리턴

exports.newPlan = ""                // 약속 이름, 날짜, 시작시간, 종료시간, 장소, 카테고리, 주최자 id -> 약속 생성
exports.editPlan = ""               // 약속 이름, 날짜, 시작시간, 종료시간, 장소, 카테고리 -> 내용 수정
exports.invitePlan = ""             // 약속 id, 대상 사용자 리스트 -> 약속 초대(약속과 link)
exports.kickPlan = ""               // 약속 id, 대상 사용자 리스트 -> 약속 강퇴처리
exports.completePlan = ""           // 사용자 id, 약속 id -> 약속 완료처리
exports.cancelPlan = ""             // 사용자 id, 약속 id -> 약속 취소처리
exports.setPublicPlan = ""          // 사용자 id, 약속 id -> 약속 공개처리
exports.setPrivatePlan = ""         // 사용자 id, 약속 id -> 약속 비공개처리
exports.deletePlan = ""             // 약속 id -> 약속 삭제 처리
exports.listCurrentPlan = ""        // 사용자 id -> 현재 약속 리스트
exports.listPrevPlan = ""           // 사용자 id -> 이전 약속 리스트
exports.detailsPlan = ""            // 약속 id -> 현재 약속 세부정보
exports.listParticipant = ""        // 약속 id -> 참여자 리스트

exports.newProfile = ""             // 사용자 id, 별명, 실명, 나이, 성별, 사진 -> 신규 생성
exports.editProfile = ""            // 사용자 id, 별명, 실명, 나이, 성별, 사진 -> 수정
exports.setNoticeOption = ""        // 사용자 id, boolean -> 설정 처리
exports.setInviteFriendOption = ""  // 사용자 id, boolean -> 설정 처리
exports.setInvitePlanOption = ""    // 사용자 id, boolean -> 설정 처리
exports.logout = ""                 // 사용자 id -> logout 처리
exports.getProfile = ""             // 사용자 id -> profile 리턴
exports.getStats = ""               // 데이터분석 이후에