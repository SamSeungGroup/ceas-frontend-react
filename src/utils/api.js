/* <삼승 CEAS Utils -  axios interceptor> */
//  - 설명: '인증이 필요한 서버로 데이터를 보내거나 조작하는 API'를 호출할 때, '보안'을 위해 'interceptor'를 사용한다.
//          'HTTP Authorization 요청 헤더'에 'jwt-token'을 보내 '서버 측 해당 API 요청' 전에 '서버 측 미들웨어'에서 
//           이를 확인한 후, '검증'이 완료되면 'API'에 요청하게 한다.

/* 1. 모듈 및 컴포넌트 추가 */
import axios from 'axios';                  // axios 모듈: '비동기 HTTP 통신' 이용 -> REST API 호출
import store from "../redux/configStore";   // configStore 모듈: 'redux' 폴더의 'AuthReducer' 파일을 'redux-persist'와 'combine'해서 'store(데이터 저장소)'를 생성
                                            // - store 컴포넌트: 'storage(rudux 데이터 저장소)' 생성
import { jwtUtils } from "./jwtUtils";      // jwtUtils 모듈: '토큰' 검증
                                            // - jwtUtils 컴포넌트: '토큰' 검증

/* 2. 함수 설정 */
// instance 함수: '사용자 정의 axios instance' 생성
const instance = axios.create({    // axios.create 메소드: '사용자 정의 axios instance' 생성
  baseURL: "http://localhost:8080" // baseURL 필드: 'axios 요청'의 'prefix 이후 설정된 URL'은 'baseURL' 뒤에 붙어서 '전체 URL' 완성
})

/* 3. 처리 */
// 인터셉터란?
//  -> 'then' 또는 'catch'로 처리되기 전에 '요청' 또는 '응답'으로 가로챌 수 있음

// 3-1. 요청 인터셉터: '2개의 콜백 함수'를 받음
instance.interceptors.request.use(                                      // interceptors.request.use 메소드: '요청 인터셉터' 추가 및 설정
  // [1] 'API 요청을 보내기 전'에 수행해야 할 일 -> 'axios 요청' 시 자동으로 '헤더'에 '토큰'을 넣어 송신
  (config) => {                                                         // config 매개변수: '모든 요청'에 적용될 '구성' 객체
    // (1) '토큰' 받기
    const token = store.getState().Auth.token;                          // token 변수: 'redux store'에서 '토큰'을 받음

    // (2) '토큰 인증' 검증
    // try -> '인증된 토큰'일 경우
    try {
      // (2-1) '인증된 토큰'일 경우
      if (token && jwtUtils.isAuth(token)) {
        config.headers.Authorization = `Bearer ${token}`;                // 'Authorization 헤더'에 '토큰'을 넣음
                                                                         //  -> Bearer: 전달자
      }

      // (2-2) '구성' 객체 반환
      return config;
    }
    
    // catch -> 
    catch (err) {                                                        // err 매개변수: '에러 정보' 객체
      console.error('[_axios.interceptors.request] config : ' + err);    // console.error 메소드: 'console' 창에 '구성 에러 내용' 표시
    }

    // (3) '구성' 객체 반환
    return config;
  },

  // [2] '오류 요청을 보내기 전'에 수행해야 할 일
  (error) => {                                                            // err 매개변수: '에러 정보' 객체
    return Promise.reject(error);                                         // Promise.reject 메소드: '거부 상태' 전달 -> '에러 정보' 전달
  }
);

// 3-2. 응답 인터셉터: '2개의 콜백 함수'를 받음
instance.interceptors.response.use(                                       // interceptors.response.use 메소드: '응답 인터셉터' 추가 및 설정
  // [1] '응답 데이터' 가공
  (response) => {                                                         // response 매개변수: '응답 정보' 객체
    return response;
  },

  // [2] '오류 응답' 처리
  (error) => {                                                             // error 매개변수: '에러 정보' 객체
    return Promise.reject(error);                                          // Project.reject 메소드: '거부 상태' 전달 -> '에러 정보' 전달
  }
);

/* 3. 처리 */
// instance 내보내기
export default instance;