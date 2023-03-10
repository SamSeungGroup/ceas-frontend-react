/* <삼승 CEAS Redux - redux store 설정> */
//   - 설명: 'redux' 폴더의 'AuthReducer' 파일을 'redux-persist'와 'combine'해서 'store(데이터 저장소)'를 생성

/* 1. 컴포넌트 추가 */
// 1-1. 'Redux' 관련 컴포넌트 추가
import { persistReducer } from "redux-persist";           // redux-persist 모듈: 'redux store'에 '저장된 데이터'를 'local storage(로컬 영구 데이터 저장소)'에 저장
                                                          // - persistReducer 컴포넌트: 'redux store'에 '저장된 데이터'를 'local storage(로컬 영구 데이터 저장소)'에 저장
import { AuthReducer } from "./reducers/AuthReducer";     // AuthReducer 컴포넌트: '토큰'을 반환하는 'reducer'
import { IdReducer } from "./reducers/IdReducer";         // IdReducer 컴포넌트: 'id(회원 식별 코드)'를 반환하는 'reducer'
import { UserIdReducer } from "./reducers/UserIdReducer"; // UserIdReducer 컴포넌트: 'userId(회원 아이디)'를 반환하는 'reducer'
import { createStore, combineReducers } from "redux";     // redux 모듈: 자바스크립트 '상태 관리' 라이브러리
                                                          // - createStore 컴포넌트: 'storage(Redux 데이터 저장소)' 생성
                                                          // - combineReducers 컴포넌트: 'reducer'와 'redux-persist'를 결합
// 1-2. 'local storage' 사용을 위한 컴포넌트 추가
import storage from "redux-persist/lib/storage";          // storage 모듈: 'local storage'를 사용하도록 설정 -> '브라우저'를 종료하고 재실행해도 '데이터'가 남아있음

/* 2. 변수 설정 */
// persistConfig 객체: 'redux-pesist' 생성
const persistConfig = {
  key: "root",          // key 필드: 'root(최상위)'라는 것을 알림
  storage: storage      // storage 필드: 'local storage'에 저장
};

// allReducers 변수: 모든 'Reducer'와 'redux-persist'를 결합하기 위한 필드 저장
const allReducers = combineReducers({
  Auth: AuthReducer,     // Auth 필드: 'redux-persist'와 결합하기 위한 'AuthReducer' 저장
  Id: IdReducer,         // Id 필드: 'redux-persist'와 결합하기 위한 'IdReducer' 저장
  UserId: UserIdReducer  // UserId 필드: 'redux-persist'와 결합하기 위한 'UserIdReducer' 저장
}); 

// store 함수: 'storage(rudux 데이터 저장소)' 생성
const store = createStore(
  persistReducer(persistConfig, allReducers),                                   // persistReducer 메소드: 'redux-persist'와 'AuthReducer'를 결합
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  // Redux_Devtools_Extenstion 추가: '개발자 모드'에서 'Redux 상태 변화'를 볼 수 있음
);

/* 3. 처리 */
// store 함수 내보내기
export default store;