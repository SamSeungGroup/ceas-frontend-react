/* <삼승 CEAS 인증 컴포넌트> */
//   - 설명: '인증된 이용자'만 통과시킬 수 있는 컴포넌트

/* 1. 모듈 추가 */
// 1-1. '로그인 관리'를 위한 라이브러리/모듈 및 컴포넌트 추가
import React from "react";                    // React 라이브러리: '메타'에서 개발한 '오픈 소스 자바스크립트 라이브러리' 
                                              // - React 컴포넌트: 'React 요소' 사용
import { Navigate } from "react-router-dom";  // react-router-dom 모듈: '웹'에서의 '라우팅' 
                                              // - Navigate 컴포넌트: '페이지 이동'
import { jwtUtils } from "../utils/jwtUtils"; // jwtUtils 모듈: 'JWT 토큰' 검증 
                                              // - jwtUtils 컴포넌트: 'JWT 토큰' 검증
import { useSelector } from "react-redux";    // react-redux 모듈: '컴포넌트의 데이터들'을 'redux store'에서 '상태 관리' 
                                              // - useSelecter 컴포넌트: 'redux store'에 저장된 '상태값'을 찾아 반환

/* 2. 함수 설정 */
// PrivateRoute 함수: '인증된 이용자'만 통과시킬 수 있는 기능 구현 + 화면 표시
const PrivateRoute = (props) => {                           // props 매개변수: path(리소스 경로), component(라우팅 컴포넌트)를 받음
  // [1] 변수 설정
  const token = useSelector((state) => state.Auth.token);   // token 변수: 'jwt 토큰'을 받아 저장
  const { component: RouteComponent, path } = props;        // props 값을 '구조 분해 할당' 하여 '인수값' 분리
                                                            // -> component 필드: 라우팅 컴포넌트
                                                            // -> path 필드: 리소스 경로
  
  // [2] 처리
  // (2-1) '비로그인 상태' -> '토큰 유효성 검증' 실패
  if (!jwtUtils.isAuth(token)) {                          
    // (2-2-1) '로그인 필요 알림창'을 화면에 표시
    alert("로그인이 필요한 페이지입니다");                  // alert 메소드: '화면 상단'에 '알림창' 표시

    // (2-2-2) '페이지 이동'
    return <Navigate to = {`/login?redirectUrl=${path}`}/>; // redirectUrl: '로그인 성공' 후 돌아갈 '화면 주소'
  }
  
  // (2-2) '로그인 상태'일 경우
  return <RouteComponent/>;                                 // '기존에 이용하던 페이지'를 이용해 '렌더링'
};

/* 3. 처리 */
// PrivateRoute 함수 내보내기
export default PrivateRoute;