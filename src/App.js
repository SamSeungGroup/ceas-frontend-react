/* <삼승 CEAS 페이지 설정> */
//  - 설명: '페이지' 관련 기능 설정

/* 1. 모듈/라이브러리 및 컴포넌트 추가 */
// 1-1. 'React 라이브러리' 추가
import React from "react";                                                                // react 라이브러리: '메타'에서 개발한 '오픈 소스 자바스크립트 라이브러리'

// 1-2. '페이지 이동'을 위한 컴포넌트 추가
import { Routes, Route, useLocation } from "react-router-dom"                             // react-router-dom 모듈: '웹'에서의 '라우팅'  
                                                                                          // - Routes 컴포넌트: '여러 Route'를 감싸서 그 중 '규칙이 일치하는 라우트' 단 하나만을 '렌더링'
                                                                                          // - Route 컴포넌트: '페이지 이동 경로' 설정
                                                                                          // - useLocation 컴포넌트: 

// 1-3. '페이지 경로 이동'을 위한 'pages' 컴포넌트 추가
import Main from "./pages/main/Main";                                                     // 'Main(메인 화면)' 페이지 추가
import SignUp from './pages/signup/SignUp';                                               // 'SignUp(회원가입)' 페이지 추가
import Login from "./pages/login/Login";                                                  // 'Login(로그인)' 페이지 추가
import CreateProduct from "./pages/create-product/CreateProduct";                         // 'CreateProduct(상품 등록)' 페이지 추가
import MyProductList from "./pages/myproduct-list/Myproduct-list";                        // 'MyProductList(내 상품 관리)' 페이지 추가
import ProductList from "./pages/product-list/ProductList";                               // 'ProductList(상품 목록)' 페이지 추가
import ProductDetail from "./pages/product-detail/ProductDetail";                         // 'ProductDetail(상품 상세)' 페이지 추가
import EnquiryToSeller from "./pages/enquiry-to-seller/Enquiry-To-Seller";                // 'EnquiryToSeller(판매자 1:1 문의)' 페이지 추가
import EditProduct from "./pages/edit-product/EditProduct";                               // 'Edit-Product(상품 수정)' 페이지 추가
import MyInformation from "./pages/myInformation/MyInformation";                          // 'MyInformation(내 정보 관리)' 페이지 추가
import ChangePassword from "./pages/change-password/ChangePassword"                       // 'ChangePassword(비밀번호 변경)' 페이지 추가
import HowToUse from "./pages/how-to-use/How-To-Use";                                     // 'How-to-Use(사이트 이용법)' 페이지 추가
import ExecutiveInstruction from "./pages/executive-instruction/Executive-Instruction";   // 'ExecutiveInstruction(임원진 소개)' 페이지 추가

// 1-4. '메뉴' 표시를 위한 'components' 컴포넌트 추가
import HeaderMenu from "./components/HeaderMenu";                                         // 'HeaderMenu(헤더 메뉴)' 컴포넌트 추가
import SideMenu from "./components/SideMenu";                                             // 'SideMenu(사이드 메뉴)' 컴포넌트 추가

// 1-6. '회원 환영 인사' 메시지 컴포넌트 추가
import WelcomeMessage from "./components/WelcomeMessage"                                  // 'WelcomeMessage(회원 환영인사 메시지)' 컴포넌트 추가

// 1-7. '로그인한 이용자'만 접근할 수 있는 컴포넌트 추가
import PrivateRoute from "./routes/privateRoute";

/* 2. 함수 설정 */
// App 함수: '페이지' 관련 기능 구현 + 화면 표시
const App = () => {
  // [1] 변수 설정
  const location = useLocation();
  
  // [2] 처리
  // '페이지 추가' 및 '페이지 이동 경로' 설정
  return (
    <React.Fragment>
      <HeaderMenu/>
      <WelcomeMessage />
      <SideMenu />

      <Routes>
        <Route path = "/" element = { <Main/> }/> 
        <Route path = "/sign-up" element = { <SignUp/> }/>
        <Route path = "/login" element = { <Login /> }/>
        <Route path = "/create-product" element = { <PrivateRoute path = {`${location.pathname}`} component = { CreateProduct } /> }/>
        <Route path = "/product-list" element = { <ProductList /> }/>
        <Route path = "/myproduct-list" element = { <PrivateRoute path = {`${location.pathname}`} component = { MyProductList } /> }/>
        <Route path = "/myInformation/:id" element = { <MyInformation /> } />
        <Route path = "/changepassword/:id" element = { <ChangePassword />} />
        <Route path = "/productdetail/:product_id" element = { <ProductDetail /> }/>
        <Route path = "/enquiry-to-seller/:product_id" element = { <PrivateRoute path = {`${location.pathname}`} component = { EnquiryToSeller } /> }/> 
        <Route path = "/edit-product/:product_id" element = { <PrivateRoute path = {`${location.pathname}`} component = { EditProduct } /> }/>
        <Route path = "/how-to-use" element = { <HowToUse /> }/>
        <Route path = "/executive-instruction" element = { <ExecutiveInstruction /> }/>
      </Routes>
      
    </React.Fragment>
  )
}

/* 3. 처리 */
// App 함수 내보내기
export default App;