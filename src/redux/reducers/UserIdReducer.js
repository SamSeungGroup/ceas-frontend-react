/* <삼승 CEAS Redux - 로그인 인증> */
//   - 설명: 'userId(회원 아이디)'를 반환하는 'reducer' 생성
//            'reducer'는 '데이터의 요청'을 보고 'redux store'에 업데이트

/* 1. 변수 설정 */
const SET_USERID = 'set-userId'; // SET_USERID 변수: 'userId 타입' 저장

const userIdInitialState = { // userIdInitialState 객체: 'userId 초기화 상태' 저장
    userId: null             // userId 필드: 'null'로 초기화
}

/* 2. 처리 */
// setUserId 함수 내보내기
// setUserId 함수: 'id 정보 저장'
export const setUserId = (userId) => ({ // setUserId 매개변수: 'userId'를 받음
    type: SET_USERID,                   // type 필드: 'userId 타입' 설정
    userId                              // userId 필드 추가(userId 추가)
})

// UserIdReducer 함수 내보내기
// UserIdReducer 함수: 'userId'를 반환하는 'reducer'
export const UserIdReducer = (state = userIdInitialState, action) => { // state 매개변수: 'userId 정보'가 저장된 '상태값'을 받음
                                                                       // action 매개변수: 'redux store'에서 운반할 '데이터'(자바스크립트 객체 형식)
    // [1] 처리
    // (1) '데이터 타입'이 'userId'인지 검증 - 'userId 타입' 검증
    switch (action.type) { 
        // 1. 'id 타입'이 맞을 경우
        case SET_USERID:
            return {
                ...state,                // ...: '얕은 복사'를 의미 -> '상태값' 반환
                userId: action.userId    // 'userId' 반환
            }
        
        // 2. 그 이외의 경우
        default:
            return state;            // '현재 상태값' 반환
    }
}