/* <삼승 CEAS 컴포넌트 - 사이드 메뉴> */
//   - 설명: '메인 페이지'의 '좌측'에 위치한 '메뉴'

/* 1. 모듈 추가 */
// 1-1. 'SCSS 모듈' 추가
import "./sidemenu.scss";                                 // sidemenu.scss 모듈: '메인 페이지'의 '사이드 메뉴' 스타일링

// 1-2. 'use 훅' 컴포넌트 추가
import { useEffect, useState } from "react";              // React 라이브러리: '메타'에서 개발한 '오픈 소스 자바스크립트 라이브러리'
                                                          // - useEffect 컴포넌트: '비동기 통신'
                                                          // - useState 컴포넌트: '상태 관리'
import { useNavigate } from "react-router-dom";           // react-router-dom 모듈: '웹'에서의 '라우팅' 
                                                          // - useNavigate 훅 컴포넌트: '페이지 이동'
// 1-3. '페이지 이동' 컴포넌트 추가
import { Link } from "react-router-dom";                  // react-router-dom 모듈: '웹'에서의 '라우팅'
                                                          // - Link 컴포넌트: 'URL' 이동, '화면'에 '태그'로 렌더링

// 1-4. '비동기 통신'을 위한 컴포넌트 추가
import { jwtUtils } from "../utils/jwtUtils";             // jwtUtils 모듈: '토큰' 검증 
                                                          // - jwtUtils 컴포넌트: '토큰' 검증
                                                          
// 1-5. 'Redux' 사용을 위한 컴포넌트 추가
import { useDispatch, useSelector } from "react-redux";   // react-redux 모듈: '컴포넌트의 데이터들'을 'redux store'에서 '상태 관리' 
                                                          // - useDispatch 훅 컴포넌트: 'redux store'에 '변경된 상태값' 저장 
                                                          // - useSelector 컴포넌트: 'redux store'에 저장된 '상태값'을 찾아 반환
                                                          
/* 2. 함수 설정 */
// Sidemenu: '화면'에 '사이드 메뉴' 기능 구현 + 화면 표시
const SideMenu = () => {
  // [1] 변수 설정
  const token = useSelector(state => state.Auth.token);   // token 변수: 'redux'에서 '토큰'을 받아 저장
  const id = useSelector(state => state.Id.id);           // id 변수: 'redux'에서 'id'를 받아 저장

  // [2] 상태 관리
  const [ isAuth, setIsAuth ] = useState(false);          // '로그인 인증 여부' 관리 -> isAuth 변수: '로그인 상태 여부' 저장, setIsAuth 함수: '로그인 인증 여부' 조작

  // [3] 처리
  // useEffect 훅: '비동기 통신', '토큰'을 검증해 '로그인 상태 여부' 검증
  useEffect(() => {
    // (1) '로그인 상태'일 경우
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);             // '로그인 상태'로 설정
    }
    
    // (2) '비로그인 상태'일 경우
    else {
      setIsAuth(false);            // '비로그인 상태'로 설정
    }
  }, [ token ]);

  // [4] 함수 설정
  // dispatch 변수: 'redux store'에 '변경된 값'을 '저장'하기 위한 기능 설정 
  const dispatch = useDispatch();           
  
  // navigate 변수: '페이지 이동' 기능 설정
  const navigate = useNavigate();                         

  // [5] 처리
  // [5-1] 화면 렌더링
  return(
    <div className = "sidemenu-wrapper">
      <h3 className = "sidemenu-title_text">Menu</h3>
      
      <div className = "sidemenu-menu">
          <div className = "sidemenu-menu_text" onClick = { () => navigate("/product-list")}>
              <div className = "sidemenu-menu_image">
                  <img src = "../../image/product_list_icon.png"/>
              </div>

              <a>상품 목록</a>
          </div>

          <div className = "sidemenu-menu_text" onClick = { () => navigate("/create-product")}>
               <div className = "sidemenu-menu_image">
                  <img src = "../../image/create_product_icon.png"/>
               </div>

               <a>상품 등록</a>
          </div>

          <div className = "sidemenu-menu_text" onClick = { () => navigate("/myproduct-list")}>
               <div className = "sidemenu-menu_image">
                  <img src = "../../image/myproduct_list_icon.png"/>
               </div>

               <a>내 상품 관리</a>
          </div>

          <div className = "sidemenu-menu_text" onClick = { () => window.open("https://admin.portone.io/auth/signin")}>
               <div className = "sidemenu-menu_image">
                  <img src = "../../image/purchase_icon.png"/>
               </div>

               <a>결제 내역</a>
          </div>
      </div>    
    </div>
  )
};

/* 3. 처리 */
// SideMenu 내보내기
export default SideMenu;