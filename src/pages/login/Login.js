/* <삼승 CEAS 페이지 - 로그인> */
//   - 설명: '비회원'이 '로그인'을 할 수 있는 페이지

/* 1. 모듈 및 컴포넌트 추가 */
// 1-1. 'use 훅' 컴포넌트 추가
import { useState } from "react";                                 // react 라이브러리: '메타'에서 개발한 '오픈 소스 자바스크립트 라이브러리' 
                                                                  // - useState 훅 컴포넌트: '상태 관리'
import { useNavigate, useSearchParams } from "react-router-dom";  // react-router-dom 모듈: '웹'에서의 '라우팅' 
                                                                  // - useNavigate 훅 컴포넌트: '페이지 이동'
                                                                  // - useSearchParams 훅 컴포넌트: '현재 URL'에서 '쿼리 파라미터' 검색

// 1-2. 'UI' 컴포넌트 추가
import { Button, TextField } from "@mui/material";                // Material UI: 'CSS 프레임워크' 
                                                                  // - Button 컴포넌트: '버튼'
                                                                  // - TextField 컴포넌트: '입력창'
import "react-toastify/dist/ReactToastify.css";                   // ReactToastify.css 모듈: '알림창' 스타일링
import { Modal, Input } from "antd";                              // antd 모듈:
                                                                  // - Modal 컴포넌트: '모달창'
                                                                  // - Input 컴포넌트: '입력창'

// 1-3. '알림창' 컴포넌트 추가
import { toast, ToastContainer } from "react-toastify";           // react-toastify 모듈: '알림창' 표시 
                                                                  // - toast 컴포넌트: '알림창' 생성
                                                                  // - ToastContainer 컴포넌트: '알림창' 렌더링

// 1-4. '로그인 관리'를 위한 모듈 및 컴포넌트 추가
import * as Yup from "yup";                                      // yup 모듈: '입력폼(form)에서 입력된 값'의 '유효성 검증'
import { Formik, ErrorMessage } from "formik";                   // formik 모듈: 입력폼 '상태' 관리 
                                                                 // - Formik 컴포넌트: 입력폼 'state' 관리
                                                                 // - ErrorMessage 컴포넌트: 입력폼 '오류 메시지' 렌더링

// 1-5. '비동기 통신'을 위한 컴포넌트 추가
import axios from "axios";                                       // axios 모듈: '비동기 HTTP 통신' 이용 -> REST API 호출

// 1-6. 'Redux' 사용을 위한 컴포넌트 추가
import { useDispatch } from "react-redux";                       // react-redux 모듈: '컴포넌트의 데이터'들을 'redux store'에서 '상태' 관리 
                                                                 // - useDispatch 훅 컴포넌트: 'redux store'에 '변경된 상태값' 저장                                                          
import { setToken } from "../../redux/reducers/AuthReducer";     // AuthReducer 모듈: '토큰'을 반환하는 'reducer' 생성 
                                                                 // - setToken 컴포넌트: '토큰' 설정
import { setId } from "../../redux/reducers/IdReducer";          // IdReducer 모듈: 'id(회원 식별 코드)'를 반환하는 'reducer' 생성
                                                                 // - setId 컴포넌트: 'id(회원 식별 코드)' 설정
import { setUserId } from "../../redux/reducers/UserIdReducer";  // UserIdReducer 모듈: 'userId(회원 아이디)'를 반환하는 'reducer' 생성
                                                                 // - setUserId 컴포넌트: 'userId(회원 아이디)' 설정

// 1-7. '이메일' 기능을 위한 모듈 추가
import emailjs, { init } from "emailjs-com";                     // emailjs-com 모듈: '이용자의 요청'에 따라 '이메일 수신'이 가능한 모듈
                                                                 // - emailjs 컴포넌트: 'emailjs' 기능 이용
                                                                 // - init 컴포넌트: 'emailjs'에서 '관리자 정보' 초기화(설정)

// 1-8. 'SCSS' 모듈 추가
import "../signup/signup.scss";                                  // signup 모듈: '회원가입 페이지' 스타일링을 '로그인 스타일링'에 이용

/* 2. 함수 설정 */
// Login 함수: '이용자'가 '로그인'을 할 수 있는 기능 구현 + 화면 표시
const Login = () => {
  // [1] 상태 관리 설정
  // [1-1] '비회원 입력 데이터' 관리
  const [ searchParams, setSearchParams ] = useSearchParams(); 
  const [ userEmail, setUnUserEmail ] = useState("");                      // '이용자 이메일 주소 입력' 상태 관리 -> userEmail 변수: '입력된 이메일 주소' 저장, setUserEmail 함수: '입력된 이메일 주소' 조작
  const [ userId, setUnUserId ] = useState("");                            // '이용자 아이디 입력' 상태 관리 -> userId 변수: '입력된 아이디' 저장, setUserId 함수: '입력된 아이디' 조작

  // [1-2] '모달창 표시' 관리
  const [ findPwModalVisible, setFindPwModalVisible ] = useState(false); // '비밀번호 찾기 모달창 표시 여부' 상태 관리 -> findPwModalVisible 변수: '모달창 표시 여부' 저장, setFindPwModalVisible 함수: '모달창 표시 여부' 조작

  // [2] 변수 설정
  // [2-1] '로그인' 설정
  const validationSchema = Yup.object().shape({                // validationSchema 변수: '입력된 값의 유효성 검증' 기능 저장
                                                               // object.shape 메소드: '유효성 검증'을 위한 객체 생성

    // (*) '로그인 데이터 검증' 필드 모음
    //      - 'userId' 필드: 이용자 아이디
    //      - 'userPassword' 필드: 이용자 비밀번호 
    
    // (1) '아이디 입력' 검증
    userId: Yup.string()
    .required("아이디를 입력하세요."),                         // required 메소드: '필수 입력 안내 메시지' 표시

    // (2) '비밀번호 입력' 검증
    userPassword: Yup.string()       
    .required("비밀번호를 입력하세요."),                       // required 메소드: '필수 입력 안내 메시지' 표시
  }); 

  // [2] 함수 설정
  // navigate 함수: '페이지 이동' 기능 
  const navigate = useNavigate();    
  
  // dispatch 함수: 'redux store'에 '변경된 값'을 저장하기 위한 기능 설정
  const dispatch = useDispatch();                              

  // submit 함수: 비동기(async) 함수, '로그인' 여부 검증 
  const submit = async (values) => {                                          // value 매개변수: '이용자'가 입력한 '아이디/비밀번호' 데이터를 받아옴
    // (1) 변수 설정
    const { userId, userPassword } = values;                                  // values 값을 '구조 분해 할당'하여 '인수값' 분리

    // (2) 처리
    // (2-1) '로그인' 처리
    // try -> '로그인 성공' 처리
    try {
      // (2-1-1) '로그인 데이터' 송신
      const { data } = await axios.post("http://localhost:8080/users/login", { // axios.post 메소드: 1. '서버 주소'로 '데이터' 송신 -> '로그인 데이터' 송신: userId, userPassword
                                                                                    //                    2. '서버 주소'로부터 '데이터' 수신 -> '회원 인증 데이터' 수신: token, id, userId
        userId,                                                                
        userPassword                                                          
      });

      // (2-1-2) '서버'에서 '토큰/id'를 받아 'redux store'에 저장 후 'redux persist' 모듈을 이용해 '토큰/id을 가진 로그인 데이터'를 'local storage'에 저장
      dispatch(setToken(data.token));   // '현재 로그인한 회원'의 '토큰' 저장
      dispatch(setId(data.id));         // '현재 로그인한 회원'의 'id' 저장
      dispatch(setUserId(data.userId)); // '현재 로그인한 회원'의 'userId' 저장
      
      // (2-1-3) '페이지'를 '리다이렉트' 할 수 있는 기능 설정
      const redirectUrl = searchParams.get("redirectUrl");                     // redirectUrl 변수: '페이지 주소'에서 '쿼리 파라미터'를 검색해 '페이지'를 '리다이렉트'할 수 있는 기능 저장

      // (2-1-4) '로그인 성공' 알림창 표시
      toast.success(<h3>삼승 CEAS의 회원이 되신 것을 환영합니다!</h3>, {
        position: "top-center",                                                // position 필드: toast 메시지 '위치' 설정 -> '상단 가운데'로 조정
        autoClose: 2000,                                                       // autoClose 필드: toast 메시지가 '자동으로 닫히는 시간' 설정 -> '2초'로 조정
      });

      // (2-1-5) 'redirectUrl'이 '쿼리 스트링'으로 존재하면 '원래 가고자 했던 페이지'로 돌아가기
      // setTimeout 함수: '일정 시간'이 지난 후 '원하는 함수'를 '예약 실행(호출)'할 수 있게 함(호출 스케줄링)
      setTimeout(() => {
        // (2-1-5-1) '로그인 실패' -> 'redirectUrl'이 '쿼리 스트링'으로 존재하면
        if (redirectUrl) {
          navigate(redirectUrl);                                               // 예약 실행 함수: 'redirectUrl'를 가지는 페이지로 이동
        }

        // (2-1-5-2) '로그인 성공' -> 'redirectUrl'이 '쿼리스트링'으로 존재하지 않으면
        else {
          navigate("/");                                                       // 예악 실행 함수: navigate 함수 -> '메인' 페이지로 이동
        }
      }, 2000);                                                                // 일정 시간: 2초
    
    // catch -> '로그인 실패' 처리
    } catch (e) {
      // (2-2-1) '서버'로부터 받은 '에러' 알림창 표시
      toast.error("로그인에 실패했습니다.", {
        position: "top-center",                                               // position 필드: 'toast 메시지' 위치 설정 -> '상단 가운데'로 조정
      });
    }
  };

  // init 메소드: 'emailjs'에서 '관리자 정보' 초기화(설정)
  init("R-PiOT-49i6isZGEQ");

  // showFindPasswordModal 함수: '비밀번호 찾기 모달창 표시 여부' 설정
  const showFindPasswordModal = () => {
    setFindPwModalVisible(true); // '비밀번호 찾기 모달창' 표시
  };

  // handleOk 함수: '모달창'의 'OK 버튼'(승인 버튼)
  const handleOk = async () => {
    // try -> '이메일 존재 여부 검사 성공' 처리
    try {
      // (1) '이메일 입력란'에 입력한 '이메일 데이터' 송신('서버'에서 '이메일 존재 여부' 확인)
      const { userData } = await axios.put("http://localhost:8080/users", { userId, userEmail });  // axios.put 메소드: 1. '서버 주소'로 '데이터' 송신 -> '회원 인증'을 위해 '이메일' 송신 : userId, userEmail
                                                                                                   //                   2. '서버 주소'로부터 '데이터' 수신 -> '회원 인증 데이터' 수신: userName, userPassword

      // (2) '입력한 이메일'로 '비밀번호 발송 성공' 알림창 표시
      toast.success(
        <div>
          이메일로 비밀번호를 발송했습니다!
          <br />
          이메일을 확인해주세요!
        </div>,

        { 
          position: "top-center",  // position 필드: toast 메시지 '위치' 설정 -> '상단 가운데'로 조정
          autoClose: 2000,         // autoClose 필드: toast 메시지가 '자동으로 닫히는 시간' 설정 -> '2초'로 조정
        },
      );

      // (3) '이메일 템플릿' 생성('서버'로부터 받아온 '회원 정보 데이터' 저장)
      const emailTemplate = {
        userName: userData.userName,          // userName 필드: 이용자 이름
        userPassword: userData.userPassword,  // userPassword 필드: 이용자 비밀번호
      };

      // (4) 'emailjs'에 '수신받을 내용 및 관련 정보' 송신
      emailjs.send("SamSeung_CEAS", "template_samseung_ceas", emailTemplate, "R-PiOT-49i6isZGEQ");
      // send 메소드: 'emailjs 서버'에 정보 송신
      // - 첫 번째 인수값: Service ID
      // - 두 번째 인수값: Template ID
      // - 세 번째 인수값: 이메일로 받을 데이터 템플릿릿
      // - 네 번째 인수값: 관리자 정보 코드

      // (5) setTimeout 함수: '일정 시간'이 지난 후 '원하는 함수'를 '예약 실행(호출)'할 수 있게 함(호출 스케줄링)
      setTimeout(() => {
        setFindPwModalVisible(false);    // '비밀번호 찾기 모달창' 숨기기
      }, 2000);                          // 일정 시간: 2초
    } 
     
    // catch -> '이메일 존재 여부 검사 실패' 처리
    catch (e) {
      // (2-1-1) '서버'로부터 받은 '에러' 알림창 표시
      toast.error(<div>존재하지 않는 이메일입니다!</div>, {
        position: "top-center",         // position 필드: toast 메시지 '위치' 설정 -> '상단 가운데'로 조정
      }); 
    }
  };

  // handleCancel 함수: '모달창'의 'Cancel 버튼'(취소 버튼)
  const handleCancel = () => {
    setFindPwModalVisible(false); // '비밀번호 찾기 모달창' 숨기기
  };

  // (3) 처리
  // (3-1) 화면 렌더링
  return (
    <Formik
      initialValues={{                        // initialValues 속성: '입력폼(form)'에서 사용할 '상태의 초깃값' 설정 -> '로그인 데이터'로 설정
        userId: "",                           // userId 필드: 아이디
        userPassword: ""                      // userPassword: 비밀번호
      }}
      validationSchema = { validationSchema } // validationSchema 속성: '입력폼(form)'에서 '유효성 검증'
      onSubmit = { submit }                   // onSubmit 속성: '입력폼(form)'에 입력된 '데이터 제출'
    >

      {({values, handleSubmit, handleChange}) => (
        <div className = "signup-wrapper">
          <img className = "login_image" src = "../../image/login_image.png"/>
          <h1 className = "signup-title">로그인</h1>

          <ToastContainer />

          <form onSubmit = { handleSubmit } autoComplete = "off">
            <div className = "input-forms">
              <div className = "input-forms-item">
                <div className = "input-label">아이디</div>
                
                <TextField 
                    name = "userId" 
                    value = { values.userId } 
                    variant = "outlined" 
                    onChange = { handleChange }/>

                <div className = "error-message">
                  <ErrorMessage 
                    name = "userId"/>
                </div>
              </div>

              <div className = "input-forms-item">
                <div className = "input-label">비밀번호</div>

                <TextField 
                  name = "userPassword" 
                  value = { values.userPassword }  
                  variant = "outlined" 
                  type = "password" 
                  onChange = { handleChange }/>

                <div className = "error-message">
                  <ErrorMessage name = "userPassword"/>
                </div>
              </div>

              <Button 
                color = "primary" 
                variant = "contained"  
                type = "submit"
                fullWidth>
                로그인
              </Button>

              <div className = "find-account_text">
                  <a href = { void 0 } onClick = { showFindPasswordModal }>
                      비밀번호 찾기
                  </a>
              </div>
            </div>
          </form>

          <Modal title = "비밀번호 찾기" visible = { findPwModalVisible } onOk = { handleOk } onCancel = { handleCancel }>
            <p>회원가입 시 등록하신 이메일 주소를 적어주세요!</p>
            <p>새로운 비밀번호가 등록하신 이메일로 발송됩니다.</p>

            <h4>이메일 주소 입력</h4>
            <Input
              value = { userEmail }
              onChange = {(e) => {
                setUnUserEmail(e.target.value);
              }}
            />

            <h4>아이디 입력</h4>
            <Input
              value = { userId }
              onChange = {(e) => {
                setUnUserId(e.target.value);
              }}
            />
          </Modal>
        </div>
      )}
    </Formik>
  );
};

/* 3. 처리 */
// Login 함수 내보내기
export default Login;