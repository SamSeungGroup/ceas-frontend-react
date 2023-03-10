/* <삼승 CEAS Redux - 로그인 인증> */
//   - 설명: 'id(회원 식별 코드)'를 반환하는 'reducer' 생성
//            'reducer'는 '데이터의 요청'을 보고 'redux store'에 업데이트

/* 1. 변수 설정 */
const SET_ID = 'set-id';  // SET_ID 변수: 'id 타입' 저장

const IdInitialState = {  // IdInitialState 객체: 'id 초기화 상태' 저장
    id: null              // id 필드: 'null'로 초기화
}

/* 2. 처리 */
// setId 함수 내보내기
// setId 함수: 'id 정보 저장'
export const setId = (id) => ({ // id 매개변수: 'id'를 받음
    type: SET_ID,               // type 필드: 'id 타입' 설정
    id                          // id 필드 추가(id 추가)
})

// IdReducer 함수 내보내기
// IdReducer 함수: 'id'를 반환하는 'reducer'
export const IdReducer = (state = IdInitialState, action) => { // state 매개변수: 'id 정보'가 저장된 '상태값'을 받음
                                                               // action 매개변수: 'redux store'에서 운반할 '데이터'(자바스크립트 객체 형식)
    // [1] 처리
    // (1) '데이터 타입'이 'id'인지 검증 - 'id 타입' 검증
    switch (action.type) { 
        // 1. 'id 타입'이 맞을 경우
        case SET_ID:
            return {
                ...state,            // ...: '얕은 복사'를 의미 -> '상태값' 반환
                Id: action.id    // 'id' 반환
            }
        
        // 2. 그 이외의 경우
        default:
            return state;            // '현재 상태값' 반환
    }
}