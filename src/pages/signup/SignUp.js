/* <삼승 CEAS 페이지 - 회원가입> */
//   - 설명: '비회원'이 '회원가입'을 할 수 있는 페이지

/* 1. 모듈 추가 */
// 1-1. 'use 훅' 컴포넌트 추가
import { useNavigate } from "react-router-dom";          // react-router-dom 모듈: '웹'에서의 '라우팅' 
                                                         // - useNavigate 훅 컴포넌트: '페이지 이동'

// 1-2. 'UI' 컴포넌트 추가
import { Button, TextField } from "@mui/material";       // Material UI: 'CSS 프레임워크' 
                                                         // - Button 컴포넌트: '버튼'
                                                         // - TextField 컴포넌트: '입력창'

// 1-3. '알림창' 컴포넌트 추가
import { toast, ToastContainer } from "react-toastify";  // react-toastify 모듈: '알림창' 표시 
                                                         // - toast 컴포넌트: '알림창' 생성
                                                         // - ToastContainer 컴포넌트: '알림창' 렌더링
import "react-toastify/dist/ReactToastify.css";          // ReactToastify.css 모듈: '알림창' 스타일링

// 1-4. '회원가입 관리'를 위한 모듈 및 컴포넌트 추가
import * as Yup from "yup";                              // yup 모듈: '입력폼(form)에서 입력된 값'의 '유효성' 검증
import { Formik } from "formik";                         // formik 모듈: 입력폼 '상태' 관리 
                                                         // - Formik 컴포넌트: 입력폼 'state' 관리

// 1-5. '비동기 통신'을 위한 모듈 추가
import axios from "axios";                               // axios 모듈: '비동기 HTTP 통신' 이용 -> 'REST API' 호출
 
// 1-6. 'SCSS' 모듈 추가
import "./signup.scss";                                  // signup 모듈: '회원가입 페이지' 스타일링

/* 2. 함수 설정 */
// SignUp 함수: '이용자'가 '회원가입'을 할 수 있는 기능 구현 + 화면 표시
const SignUp = () => {
    // [1] 변수 설정
    // [1-1] '회원가입' 설정
    const validationSchema = Yup.object().shape({                                               // validationSchema 변수: '입력된 값의 유효성 검증' 기능 저장
                                                                                                // object.shapte 메소드: '유효성 검증'을 위한 객체 생성

        // (*) '회원가입 데이터 검증' 필드 모음
        //      - 'userName' 필드: 이용자 닉네임
        //      - 'userEmail' 필드: 이용자 이메일
        //      - 'userId' 필드: 이용자 아이디
        //      - 'userPassword' 필드: 이용자 비밀번호 
        //      - 'userPassword2' 필드: 이용자 비밀번호 확인
        
        // (1) '닉네임 입력' 검증 -> 'userName' 필드
        userName: Yup.string()
            .min(2, "닉네임은 최소 2글자 이상입니다.")                                          // min 메소드: '최소 입력 길이' 제한 -> '최소 2자리'로 제한
            .matches(                                                                           // matches 메소드: '인수값'과 일치 시 입력값' 제한
                /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
                "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안 됩니다."
            ) 
            .required("닉네임을 입력하세요."),                                                  // required 메소드: '필수 입력 안내 메시지'를 입력창 하단에 표시
    
        // (2) '이메일 입력' 검증 -> 'userEmail' 필드
        userEmail: Yup.string()
            .email("올바른 이메일 형식이 아닙니다!")                                            // email 메소드: '이메일 형식' 검증
            .required("이메일을 입력하세요."),                                                  // required 메소드: '필수 입력 안내 메시지'를 입력창 하단에 표시
        
        // (3) '아이디 입력' 검증-> 'userId' 필드
        userId: Yup.string()
            .min(2, "아이디는 최소 2글자 이상입니다.")                                          // '최소 입력 길이' 제한 -> 최소 2자리로 제한
            .required("아이디를 입력하세요."),                                                  // required 메소드: '필수 입력 안내 메시지' 표시
         
        // (4) '비밀번호 입력' 검증 -> 'userPassword' 필드
        userPassword: Yup.string()
            .min(8, "비밀번호는 최소 8자리 이상입니다.")                                        // min 메소드: '최소 입력 길이' 제한 -> 최소 10자리로 제한
            .matches(                                                                           // matches 메소드: '인수값'과 일치 시 '입력값' 제한
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
                "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!")        
            .required("비밀번호를 입력하세요."),                                                // required 메소드: '필수 입력 안내 메시지' 표시
 
        // (4-1) '비밀번호 확인' 검증 -> 'userPassword2' 필드
        userPassword2: Yup.string()
            .oneOf([Yup.ref("userPassword"), null], "비밀번호가 일치하지 않습니다!")            // oneOf 메소드: '값 일치 여부' 판단, ref 메소드: 'userPassword' 필드 연결('비밀번호 확인'을 위함)
            .required("비밀번호를 한 번 더 입력해 주세요."),                                    // required 메소드: '필수 입력 안내 메세지' 표시

        // (5) '가맹점 식별코드 입력' 검증 -> 'IMP' 필드
        IMP: Yup.string() 
          .required("IMP(가맹점 식별코드)를 입력하세요."),                                      // required 메소드: '필수 입력 안내 메세지' 표시

        // (6) 'PG사 코드 입력' 검증 -> 'PG' 필드
        PG: Yup.string()
          .required("PG사 코드를 입력하세요."),                                                 // required 메소드: '필수 입력 안내 메세지' 표시
  });
  
  // [2] 함수 설정
  // navigate 함수: '페이지 이동' 기능 설정
  const navigate = useNavigate();                                                             

  // submit 함수: 비동기(async) 함수, '회원가입 여부' 검증
  const submit = async (values) => {                                                      // value 매개변수: '이용자'가 입력한 '닉네임/이메일/아이디/비밀번호/IMP(가맹점 식별코드) 코드/PG사 코드' 데이터를 받아옴
    // (1) 변수 설정
    const { userName, userEmail, userId, userPassword } = values;                        // values 인수값을 '구조 분해 할당'하여 '인수값' 분리
    
    // (2) 처리
    // (2-1) '회원가입' 처리
    // try -> '회원가입 성공' 처리
    try {
      // (2-1-1) '회원가입 데이터'를 '서버'에 송신 
      await axios.post("http://localhost:8080/users", {                                    // axios.post 메소드: '서버 주소'로 '데이터' 송신 -> '회원가입 데이터' 송신
        userName,                                                                          // userName 필드: 이용자 이름
        userEmail,                                                                         // userEmail 필드: 아이디
        userId,                                                                            // userId 필드: 이메일
        userPassword,                                                                      // userPassword 필드: 비밀번호
      });
        
      // (2-1-2) '회원가입 성공' 알림창 표시
      toast.success(<h3>회원가입이 완료되었습니다.<br/>로그인 화면으로 이동합니다.</h3>, { // toast.success 메소드: '성공 알림창' 표시 -> '회원가입 성공 알림창' 표시
        position: "top-center",                                                            // position 필드: toast 메시지 '위치' 설정 -> '상단 가운데'로 조정
        autoClose: 2000                                                                    // autoClose 필드: toast 메시지가 '자동으로 닫히는 시간' 설정 -> '2초'로 조정
      });

      // (2-1-3) '2초'가 지난 후 '로그인 화면'으로 이동
      // setTimeout 함수: '일정 시간'이 지난 후 '원하는 함수'를 '예약 실행(호출)'할 수 있게 함(호출 스케줄링)
      setTimeout(()=> {
        navigate("/login");                                                                // 예악 실행 함수: navigate 함수 -> '로그인 페이지'로 이동
      }, 2000);                                                                            // 일정 시간: '2초(2000밀리초)'
        
    // catch -> '회원가입 실패' 처리
    } catch (e) {
      // (2-1-1) '서버'로부터 받은 '에러' 알림창 표시
      toast.error("회원가입에 실패했습니다", {                                             // toast.error 메소드: '실패 알림창' 표시
        position: "top-center"                                                             // position 필드: toast 메시지 '위치' 설정 -> '상단 가운데'로 조정
      });
    }
  };
  
  // [3] 처리
  // [3-1] 화면 렌더링
  return ( 
    <Formik
      initialValues = {{                              // initialValues 속성: '입력폼(form)'에서 사용할 '상태의 초깃값' 설정 -> '회원가입 데이터'로 설정
        userName: "",                                 //                      - userName 필드: 이용자 닉네임
        userEmail: "",                                //                      - userEmail 필드: 이용자 이메일
        userId: "",                                   //                      - userId 필드: 이용자 아이디
        userPassword: "",                             //                      - userPassword 필드: 이용자 비밀번호
        userPassword2: "",                            //                      - userPassword2 필드: 이용자 비밀번호 확인
      }}
      validationSchema = { validationSchema }         // validationSchema 속성: '입력폼(form)'에서 '유효성' 검증
      onSubmit = { submit }                           // onSubmit 속성: '입력폼(form)'에 입력된 '데이터 제출'
      validateOnMount = { true }                      // validateOnMount 속성: '함수 유효성 검사'에 사용, 'Yup 스키마' 반환
    >

    {({ values, handleSubmit, handleChange, errors }) => ( 
        <div className = "signup-wrapper">
            <img className = "signup_image" src = "../../image/signup_image.png"/>
            <h1 className = "signup-title">회원가입</h1>
            
            <ToastContainer/>
            
            <form onSubmit = { handleSubmit } autoComplete = "off"> 
                <div className = "input-forms">
                    <div className = "input-forms-item">
                        <div className = "input-label">닉네임</div>
                        
                        <TextField
                            name = "userName"
                            value = { values.userName }
                            variant = "outlined"
                            onChange = { handleChange }
                        />
                
                        <div className = "error-message">
                            { errors.userName }
                        </div>
                    </div>
              
                    <div className = "input-forms-item">
                        <div className = "input-label">이메일</div>
                
                        <TextField
                            name = "userEmail"
                            value = { values.userEmail }
                            variant = "outlined"
                            onChange = { handleChange }
                        />
                
                        <div className = "error-message">
                            { errors.userEmail }
                        </div>
                    </div>
              
                    <div className = "input-forms-item">
                        <div className = "input-label">아이디</div>
                
                        <TextField
                            name = "userId"
                            value = { values.userId }
                            variant = "outlined"
                            onChange = { handleChange }
                        />
                              
                        <div className = "error-message">
                            { errors.userId }
                        </div>
                    </div>
                          
                    <div className = "input-forms-item">
                        <div className = "input-label">비밀번호</div>
                
                        <TextField
                            name = "userPassword"
                            value = { values.userPassword }
                            variant = "outlined"
                            type = "password"
                            onChange = { handleChange }
                        />
                        
                        <div className="error-message">
                            { errors.userPassword }
                        </div>
                    </div>
                    
                    <div className="input-forms-item">
                        <div className="input-label">비밀번호 확인</div>
                        
                        <TextField
                            name = "userPassword2"
                            value = { values.userPassword2 }
                            variant = "outlined"
                            type = "password"
                            onChange = { handleChange }
                        />
                    
                        <div className = "error-message">
                            { errors.userPassword2 }
                        </div>
                    </div>
                    
                    <Button 
                        color = "primary" 
                        variant = "contained" 
                        type = "submit"
                        fullWidth >
                        회원가입
                    </Button>

                </div>
            </form>
        </div>
    )}
    </Formik>
  );
};

/* 3. 처리 */
// SignUp 함수 내보내기
export default SignUp;