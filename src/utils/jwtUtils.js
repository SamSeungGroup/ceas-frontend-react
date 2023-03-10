/* <삼승 CEAS Utils - 토큰 검증 클래스> */
//   - 설명: 'JWT(JSON Web Token)'을 이용해 '토큰의 유효성'을 검증하여 '이용자 인증'
//            -> 'JWT(JSON Web Token)': 인증에 필요한 정보들을 암호화시킨 토큰

/* 1. 모듈 추가 */
// 1-1. 'jwt 토큰' 검증을 위한 모듈 추가
import jwtDecode from "jwt-decode"; // jwt-decode 모듈: 'jwt'를 '파싱'하는 데 도움을 주는 모듈 
                                    // - jwtDecode 컴포넌트: 'jwt'를 복호화'

/* 2. 처리 */
// jwtUtils 클래스: '토큰 유효성' 검사
export class jwtUtils {
  // [1] '로그인 상태' 여부 검사
  // isAuth 함수: '로그인 상태' 여부 검사
  static isAuth(token) {              // token 매개변수: '토큰'을 받음
    // (1) '토큰'이 없을 경우
    if (!token) {
      return false;
    }
    
    // (2) '토큰'이 있을 경우 -> '토큰 유효성' 검사
    // (2-1) '토큰 디코딩(복호화)'
    const decoded = jwtDecode(token); // decoded 변수: '토큰'을 '디코딩(복호화)'한 정보를 저장
    
    // (2-1-1) '토큰 유효성 검사' 성공 -> '디코딩(복호화)된 토큰의 만료시간'이 '지정한 시간'보다 길 경우
    if (decoded.exp > new Date().getTime() / 1000) { 
      return true;                    // '이용자 인증' 성공
    }
    
    // (2-1-2) '토큰 유효성 검사' 실패 -> '디코딩(복호화)된 토큰의 만료시간'이 '지정한 시간'보다 적을 경우
    else {
      return false;                   // '이용자 인증' 실패
    }
  }
  
  /*
  // [2] '토큰'에서 '이용자 아이디' 가져오기
  // getId 함수: '토큰'에서 '이용자 아이디'를 가져옴
  static getId(token) {              // token 매개변수: '토큰'을 받음
    // (1) '토큰 디코딩(복호화)'
    const decoded = jwtDecode(token) // decoded 변수: '토큰'을 '디코딩(복호화)'한 정보를 저장

    // (2) '토큰 식별자 ID' 반환
    return decoded.id;               // id 필드: 회원 식별 필드
  }
  */
}