/* <삼승 CEAS 컴포넌트 - '회원 환영인사 메시지'> */
//   - 설명: 1. '비로그인' 시 모든 페이지에서 '헤더 메뉴 아래'에 '비회원 환영인사 메시지' 표시
//           2. '로그인' 후 '모든 페이지'에서 '헤더 메뉴 아래'에 '회원 환영인사 메시지' 표시

/* 1. 모듈 추가 */
// 1-1. 'use 훅' 컴포넌트 추가 
import { useEffect, useState } from "react";                                          // react 라이브러리: '메타'에서 개발한 '오픈 소스 자바스크립트 라이브러리'
                                                                                      // - useEffect 훅 컴포넌트: '비동기 통신' 
                                                                                      // - useState 훅 컴포넌트: '상태 관리'

// 1-2. '비동기 통신'을 위한 모듈 및 컴포넌트 추가
import axios from "axios";                                                            // axios 모듈: '비동기 HTTP 통신' 이용 -> 'REST API' 호출
import api from "../utils/api";                                                       // api 컴포넌트: '비동기 HTTP 통신' 이용 -> REST API 호출 + '인터셉터' 기능 
import { jwtUtils } from "../utils/jwtUtils";                                         // jwtUtils 컴포넌트: '토큰'을 이용한 '이용자 계정' 보안

// 1-3. 'Redux' 사용을 위한 컴포넌트 추가
import { useSelector } from "react-redux";                                            // react-redux 모듈: '컴포넌트 바깥'에서 '상태 관리' 
                                                                                      // - useSelector 훅 컴포넌트: 'redux store'에 저장된 '상태값'을 찾아 반환

// 1-4. 'SCSS' 모듈 추가
import "./welcomemessage.scss";                                                       // welcomemessage 모듈: '회원 환영인사' 페이지 스타일링

/* 2. 함수 설정 */
// WelcomeMessage 함수: '회원 환영인사 메시지' 기능 구현 + 화면 표시
const WelcomeMessage = () => {
    // [1] 변수 설정
    const token = useSelector(state => state.Auth.token); // token 변수: 'redux store'에서 '토큰'을 받아 저장 
    const id = useSelector(state => state.Id.id);         // id 변수: 'redux store'에서 'id'를 받아 저장    

    // [2] 상태 관리
    const [ isLogin, setIsLogin ] = useState(false);      // '로그인 여부' 상태 관리 -> isLogin 변수: '로그인 여부' 저장, setIsLogin 함수: '로그인 여부' 조작
    const [ userName, setUserName ] = useState("");       // '회원 이름 저장' 상태 관리 -> userName 변수: '회원 이름 저장 여부' 저장, setUserName 함수: '회원 이름 저장 여부' 조작

    // [3] 처리
    // [3-1] '회원 이름 데이터'를 '서버'로부터 수신
    useEffect(() => {
        // try -> '회원 이름 데이터 수신 성공' 처리
        try{
            // (1) '회원 이름 데이터'를 '서버'로부터 수신
            // getUserName 함수: '비동기(async)' 함수, '회원 이름 데이터' 저장
            const getUserName = async () => {
                const { data } = await api.get(`/users/${id}`); // axios.get 메소드: '서버 주소'로부터 '데이터' 수신: userName

                return data;
            }

            // (2) '회원 이름 데이터'를 'setUserName' 함수에 적용 + '로그인'되었다고 설정
            getUserName().then((response) => {
                setUserName(response.data.userName); // '내 이름' 설정
            })

            setIsLogin(true);               // '로그인' 설정
        }

        // catch -> '회원 이름 데이터 수신 실패' 처리
        // (1) '로그인'이 되지 않았다고 설정
        catch(e){
            setIsLogin(false);                  // '비로그인' 설정
        }
    }, []); 

    // [3-2] 화면 렌더링
    return(
        jwtUtils.isAuth(token) && isLogin ? (
            <div className = "welcome-message">
                <img className = "welcome_image1" src = "../../image/welcome_icon.png"/>
                    { userName }님 환영합니다! 오늘 하루 즐거운 쇼핑 되세요!
                <img className = "welcome_image2" src = "../../image/welcome_icon.png"/>
            </div>
        ) : (
            <div className = "welcome-message">
                <img className = "welcome_image1" src = "../../image/customer_icon.png"/>
                    손님 환영합니다! 오늘 하루 즐거운 쇼핑 되세요!
                <img className = "welcome_image2" src = "../../image/customer_icon.png"/>
            </div>
        )
    )
}

/* 3. 처리 */
// WelcomeMessage 함수 내보내기
export default WelcomeMessage;