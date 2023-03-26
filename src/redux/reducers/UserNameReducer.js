/* <삼승 CEAS Redux - 회원 이름 반환> */
//   - 설명: 'userName(회원 이름)'을 반환하는 'reducer' 생성
//            'reducer'는 '데이터의 요청'을 보고 'redux store'에 업데이트

/* 1. 변수 설정 */
const SET_USERNAME = 'set-userName'; // SET_USERNAME 변수: 'userName 타입' 저장

const userNameInitialState = { // userNameInitialState 객체: 'userName 초기화 상태' 저장
    userName: null             // userName 필드: 'null'로 초기화
}

/* 2. 처리 */
// setUserName 함수 내보내기
// setUserName 함수: 'userName 정보 저장'
export const setUserName = (userName) => ({ // setUserName 매개변수: 'userName'를 받음
    type: SET_USERNAME,                     // type 필드: 'userName 타입' 설정
    userName                                // userName 필드 추가(userName 추가)
})

// UserNameReducer 함수 내보내기
// UserNameReducer 함수: 'userName'를 반환하는 'reducer'
export const UserNameReducer = (state = userNameInitialState, action) => { // state 매개변수: 'userName 정보'가 저장된 '상태값'을 받음
                                                                           // action 매개변수: 'redux store'에서 운반할 '데이터'(자바스크립트 객체 형식)
    // [1] 처리
    // (1) '데이터 타입'이 'userName'인지 검증 - 'userName 타입' 검증
    switch (action.type) { 
        // 1. 'SET_USERNAME 타입'이 맞을 경우
        case SET_USERNAME:
            return {
                ...state,                  // ...: '얕은 복사'를 의미 -> '상태값' 반환
                userName: action.userName  // 'userId' 반환
            }
        
        // 2. 그 이외의 경우
        default:
            return state;                  // '현재 상태값' 반환
    }
}