/* <삼승 CEAS Redux - 회원 아이디 인증> */
//   - 설명: '토큰'을 반환하는 'reducer' 생성
//            'reducer'는 '데이터의 요청'을 보고 'redux store'에 업데이트

/* 1. 변수 설정 */
const SET_TOKEN = 'set-token'; // SET_TOKEN 변수: '토큰 타입' 저장

const AuthInitialState = {     // AuthInitialState 객체: '토큰 초기화 상태' 저장
    token: null                // token 필드: 'null'로 초기화
}

/* 2. 처리 */
// setToken 함수 내보내기
// setToken 함수: '토큰 정보 저장'
export const setToken = (token) => ({ // token 매개변수: '토큰'을 받음
    type: SET_TOKEN,                  // type 필드: '토큰 타입' 설정
    token                             // token 필드 추가(토큰 추가)
})

// AuthReducer 함수 내보내기
// AuthReducer 함수: '토큰'을 반환하는 'reducer'
export const AuthReducer = (state = AuthInitialState, action) => { // state 매개변수: '토큰 정보'가 저장된 '상태값'을 받음
                                                                   // action 매개변수: 'redux store'에서 운반할 '데이터'(자바스크립트 객체 형식)
    // [1] 처리
    // (1) '데이터 타입'이 '토큰'인지 검증 - '토큰 타입' 검증
    switch (action.type) { 
        // 1. '토큰 타입'이 맞을 경우
        case SET_TOKEN:
            return {
                ...state,            // ...: '얕은 복사'를 의미 -> '상태값' 반환
                token: action.token  // '토큰' 반환
            }
        
        // 2. 그 이외의 경우
        default:
            return state;            // '현재 상태값' 반환
    }
}