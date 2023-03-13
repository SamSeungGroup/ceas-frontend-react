/* <삼승 CEAS 컴포넌트 - 헤더> */
//   - 설명: '메인 페이지'의 '상단'에 위치한 '메뉴 헤더'

/* 1. 모듈 및 컴포넌트 추가 */
// 1-1. 'SCSS' 모듈 추가
import "./headermenu.scss";                                   // header.scss 모듈: '메인 페이지'의 '메뉴 헤더' 스타일링

// 1-2. 'use 훅' 컴포넌트 추가
import { useEffect, useState } from "react";                  // React 라이브러리: '메타'에서 개발한 '오픈 소스 자바스크립트 라이브러리'
                                                              // - useEffect 컴포넌트: '비동기 통신'
                                                              // - useState 컴포넌트: '상태 관리'
import { useNavigate } from "react-router-dom";               // react-router-dom 모듈: '웹'에서의 '라우팅' 
                                                              // - useNavigate 훅 컴포넌트: '페이지 이동'
// 1-3. '페이지 이동' 컴포넌트 추가
import { Link } from "react-router-dom";                      // react-router-dom 모듈: '웹'에서의 '라우팅'
                                                              // - Link 컴포넌트: 'URL' 이동, '화면'에 '태그'로 렌더링

// 1-4. '비동기 통신'을 위한 컴포넌트 추가
import axios from "axios";                                    // axios 모듈: '비동기 HTTP 통신' 이용 - REST API 호출 
import { jwtUtils } from "../utils/jwtUtils";                 // jwtUtils 모듈: '토큰' 검증 
                                                              // - jwtUtils 컴포넌트: '토큰' 검증
                                                          
// 1-5. 'Redux' 사용을 위한 컴포넌트 추가
import { useDispatch, useSelector } from "react-redux";       // react-redux 모듈: '컴포넌트의 데이터들'을 'redux store'에서 '상태 관리' 
                                                              // - useDispatch 훅 컴포넌트: 'redux store'에 '변경된 상태값' 저장 
                                                              // - useSelector 컴포넌트: 'redux store'에 저장된 '상태값'을 찾아 반환
import { setToken } from "../redux/reducers/AuthReducer";     // AuthReducer 모듈: '토큰'을 반환하는 'reducer' 생성
                                                              // - setToken 컴포넌트: '토큰' 설정
import { setId } from "../redux/reducers/IdReducer";          // IdReducer 모듈: 'id(회원 식별 코드)'를 반환하는 'reducer' 생성
                                                              // - setId 컴포넌트: 'id(회원 식별 코드)' 설정
import { setUserId } from "../redux/reducers/UserIdReducer";  // UserIdReducer 모듈: 'userId(회원 아이디)'를 반환하는 'reducer' 생성
                                                              // - setUserId 컴포넌트: 'userId(회원 아이디)' 설정

/* 2. 함수 설정 */
// HeaderMenu 함수: '화면'에 '헤더 메뉴' 기능 구현 + 화면 표시
const HeaderMenu = () => {
  // [1] 변수 설정
  const token = useSelector(state => state.Auth.token);   // token 변수: 'redux store'에서 '토큰'을 받아 저장
  const id = useSelector(state => state.Id.id);           // id 변수:  'redux store'에서 'id'를 받아 저장

  // [2] 상태 관리
  // [2-1] '로그인 인증' 관리
  const [ isAuth, setIsAuth ] = useState(false);          // '로그인 인증 여부' 관리 -> isAuth 변수: '로그인 인증 여부' 저장, setIsAuth 함수: '로그인 인증 여부' 조작

  // [2-2] '내 정보 데이터' 관리
  const [ userImage, setUserImage ] = useState("");       // '내 이미지 파일' 상태 관리 -> userImage 변수: '내 이미지 파일' 저장, setUserImage 함수: '내 이미지 파일' 조작

  // [3] 처리
  // [3-1] '토큰'을 검증해 '로그인 상태 여부' 검증
  useEffect(() => {
    // (1) '로그인 상태'일 경우
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);                  // '로그인 상태'로 설정
    }
    
    // (2) '비로그인 상태'일 경우
    else {
      setIsAuth(false);                 // '비로그인 상태'로 설정
    }
  }, [ token ]);

  // [3-2] '내 프로필 이미지 데이터'를 '서버'로부터 수신
  useEffect(() => {
    // try -> '내 프로필 이미지 데이터 수신 성공' 처리
    try{
      // (1) '내 프로필 이미지 데이터'를 '서버'로부터 수신
      // getUser 함수: '비동기(async)' 함수, '회원 정보 데이터' 저장
      const getUser = async () => {
        const { data } = await axios.get(`http://localhost:8080/users/${id}`); // axios.get 메소드: '서버 주소'로부터 '데이터' 수신 -> '내 프로필 이미지 데이터' 수신: userImage

        return data;
    }

    // (2) '내 정보 데이터 중 내 프로필 이미지'를 'setUserImage' 함수에 설정
    getUser.then((response) => {
        setUserImage(response.userImage);
    });
    }

    // catch -> '내 정보 데이터 수신 실패' 처리
    catch(e){

    }
  },[])

  // [4] 함수 설정
  // dispatch 함수: 'redux store'에 '변경된 값'을 저장하기 위한 기능 저장
  const dispatch = useDispatch(); 

  // navigate 함수: '페이지 이동' 기능 저장
  const navigate = useNavigate();  

  // logout 함수: '비동기(async) 함수', '로그아웃' 기능 설정
  const logout = async () => {
    // (1) '토큰/id'값을 비움 
    await dispatch(setToken(""));  // dispatch 메소드: 'redux store'에 '변경된 값' 저장 
    await dispatch(setId(""));     // dispatch 메소드: 'redux store'에 '변경된 값' 저장 
    await dispatch(setUserId("")); // dispatch 메소드: 'redux store'에 '변경된 값' 저장

    // (2) '로그아웃' 알림창 표시
    alert("로그아웃 되었습니다."); // alert 메소드: '화면 상단'에 '알림창' 표시

    // (3) '메인' 페이지로 이동
    navigate("/");                 // naviagate 함수: '페이지 이동' -> '메인 페이지' 이동
  };
  
  // [5] 처리
  // [5-1] 화면 렌더링
  return (
    <div className = "headermenu-wrapper">
      <div className = "headermenu-title">      
        <Link to = "/">
          <span>CEAS</span>
        </Link>
      </div>
      
      <div className = "headermenu-menu">
       {
          isAuth ? ( 
          <>
            <img className = "headermenu-menu_image" src = { userImage }/>
            <div className = "myinformation_link">
              <Link to = {`/myinformation/${id}`}>
              내 정보 수정
              </Link>
            </div>

            <div className = "logout_link">
              <Link to = "#" onClick = { logout }>
                로그아웃
              </Link>
            </div>
          </>
          ) : (
          <>
            <Link to = "/login">로그인</Link>
            <Link to = "/sign-up">회원가입</Link>
          </>
          )
       }
      </div>
    </div>
  );
};

/* 3. 처리 */
// HeaderMenu 함수 내보내기
export default HeaderMenu;