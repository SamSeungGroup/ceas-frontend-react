/* <삼승 CEAS 페이지 - 비밀번호 변경> */
//   - 설명: '회원'이 '비밀번호를 변경'할 수 있는 페이지

/* 1. 모듈 및 컴포넌트 추가 */
// 1-1. 'use 훅' 컴포넌트 추가
import { useDispatch, useSelector } from "react-redux";     // react-redux 모듈: '컴포넌트의 데이터들'을 'redux store'에서 '상태 관리'
                                                            // - useDispatch 훅 컴포넌트: 'redux store'에 '변경된 상태값' 저장
                                                            // - useSelecter 컴포넌트 훅: 'redux store'에 저장된 '상태값'을 찾아 반환
import { useNavigate, useParams } from "react-router-dom";  // react-router-dom 모듈: '웹'에서의 '라우팅' 
                                                            // - useNavigate 훅 컴포넌트: '페이지 이동'
                                                            // - useParams 훅 컴포넌트: '쿼리 파라미터' 검색

// 1-2. 'UI' 컴포넌트 추가
import { Form, Input, Button } from "antd";                  // antd 모듈:
                                                             // - Form: '입력폼'
                                                             // - Input: '입력창'
                                                             // - Button: '버튼'
import { Formik, ErrorMessage } from "formik";               // formik 모듈: '입력폼(form) 상태' 관리 
                                                             // - Formik 컴포넌트: '입력폼(form)의 state' 관리
                                                             // - ErrorMessage 컴포넌트: '입력폼(form)의 오류 메시지' 렌더링
import { toast, ToastContainer } from "react-toastify";      // react-toastify 모듈: '알림창' 표시 
                                                             // - toast 컴포넌트: '알림창' 생성
                                                             // - ToastContainer 컴포넌트: '알림창' 렌더링
import * as Yup from "yup";                                  // yup 모듈: 'form에서 입력된 값'의 '유효성 검증'
                                                        
// 1-3. '비동기 통신'을 위한 모듈 추가
import api from "../../utils/api"; 

// 1-4. 'Redux' 사용을 위한 컴포넌트 추가
import { setToken } from "../../redux/reducers/AuthReducer";     // AuthReducer 모듈: '토큰'을 반환하는 'reducer' 생성
                                                              // - setToken 컴포넌트: '토큰' 설정
import { setId } from "../../redux/reducers/IdReducer";          // IdReducer 모듈: 'id(회원 식별 코드)'를 반환하는 'reducer' 생성
                                                              // - setId 컴포넌트: 'id(회원 식별 코드)' 설정
import { setUserId } from "../../redux/reducers/UserIdReducer";  // UserIdReducer 모듈: 'userId(회원 아이디)'를 반환하는 'reducer' 생성
                                                              // - setUserId 컴포넌트: 'userId(회원 아이디)' 설정

// 1-5. 'SCSS' 모듈 추가
import "./changepassword.scss";                              // changepassword 모듈: '비밀번호 변경 페이지' 스타일링 적용

/* 2. 함수 설정 */
// ChangePassword 함수: '비밀번호를 변경'할 수 있는 기능 구현 + 화면 표시
const ChangePassword = () => {
  // [1] 변수 설정
  const { id } = useParams();                                                             // id 필드: '쿼리 파라미터'로 'id'를 받음

  const validationSchema = Yup.object().shape({                                           // validationSchema 변수: '입력된 값의 유효성 검증' 기능 저장
                                                                                          // object.shapte 메소드: '유효성 검증'을 위한 객체 생성
    // (1-1) '현재 비밀번호 입력' 검증
    nowPassword: Yup.string().
    required("현재 비밀번호를 입력해 주세요!"),                                           // required 메소드: '필수 입력 안내 메시지' 표시
    
    // (1-2) '변경할 비밀번호 입력' 검증
    userPassword: Yup.string().
    required("변경할 비밀번호를 입력해주세요!"),                                          // required 메소드: '필수 입력 안내 메시지' 표시

    // (1-3) '변경할 비밀번호 입력 확인' 검증
    userPassword2: Yup.string()
      .oneOf([Yup.ref("userPassword"), null], "변경할 비밀번호가 일치하지 않습니다.") // oneOf 메소드: '값 일치 여부' 판단, ref 메소드: 'changed_Password' 필드 연결('변경할 비밀번호 확인'을 위함)
      .required("필수 입력 값입니다!"),                                                   // required 메소드: '필수 입력 안내 메시지' 표시
  });

  // [2] 함수 설정
  const navigate = useNavigate(); // navigate 함수: '페이지 이동 기능' 저장
  const dispatch = useDispatch(); // dispatch 함수: 'redux store'에 '변경된 값'을 저장하기 위한 기능 저장

  // submit 함수: '비동기(async)' 함수, '비밀번호 변경 여부' 검증
  const submit = async (values) => {                    // value 매개변수: '이용자'가 입력한 '현재 비밀번호/변경할 비밀번호' 데이터를 받아옴
    // (1) 변수 설정
    const { userPassword } = values;                    // values 값을 '구조 분해 할당'하여 '인수값' 분리
 
    // (2) 처리
    // (2-1) '비밀번호 변경' 처리
    // try -> '비밀번호 변경 성공' 처리
    try {
      // (2-1-1) '변경된 비밀번호 데이터' 송신
      await api.post(`/users/${id}`, { userPassword }); // axios.post 메소드: 1. '서버 주소'로 '데이터' 송신 -> '변경한 비밀번호 데이터' 송신
                                                        //                        : userPassword
                                                        //                    2. '서버 주소'로부터 '데이터' 수신 -> '임시 비밀번호 데이터' 송신
                                                        //                        : userPassword

      // (2-1-2) '비밀번호 변경 성공 알림창' 표시
      toast.success(
        <div>
          비밀번호 변경이 완료되었습니다!
          <br />
          다시 로그인해 주세요!
        </div>,
        {
          position: "top-center",                                              // position 필드: toast 메시지 '위치' 설정 -> '상단 가운데'로 조정
          autoClose: 2000,                                                     // autoClose 필드: toast 메시지가 '자동으로 닫히는 시간' 설정 -> '2초'로 조정
        },  
      );

      // (2-1-2) '로그인 페이지'로 이동 + 로그아웃
      // setTimeout 함수: '일정 시간'이 지난 후 '원하는 함수'를 '예약 실행(호출)'할 수 있게 함(호출 스케줄링)
      setTimeout(() => {
        dispatch(setToken(""));                                           
        dispatch(setId(""));      
        dispatch(setUserId(""));  

        navigate("/login");                                               // 예악 실행 함수: navigate 함수 -> '로그인 페이지'로 이동
      }, 2000);                                                           // 일정 시간: 2초
    }               

    // catch -> '비밀번호 변경 실패' 처리
    catch (e) {
      // (2-2-1) '서버'로부터 받은 '에러' 알림창 표시
      toast.error(<div>현재 비밀번호가 올바르지 않습니다.</div>, {
        position: "top-center",                                           // position 필드: toast 메시지 '위치' 설정 -> '상단 가운데'로 조정
      });
    }
  };

  // [3] 처리
  // [3-1] 화면 렌더링
  return (
    <div className = "myinfo-wrapper">
      <ToastContainer />

      <div className = "change-password-header">
          <img className = "change-password-header_image" src = "../../image/change-password_icon.png"/>
          <div className = "change-password-header_title">비밀번호 변경</div>
      </div>

      <div className = "myinfo-content">
        <div className = "change-password">
          <Formik
            initialValues = {{                        // initialValues 속성: 'form'에서 사용할 '상태의 초깃값' 설정 -> '비밀번호 변경 데이터'로 설정
              nowPassword: "",                        // nowPassword: '현재 회원 비밀번호' 필드
              userPassword: "",                       // userPassword: '변경된 비밀번호' 필드
              userPassword2: "",                      // userPassword2: '변경된 비밀번호 확인' 필드
            }}
            validationSchema = { validationSchema }   // validationSchema 속성: 'form'에서 '유효성 검증'
            onSubmit = { submit }                     // onSubmit 속성: 'form'에 입력된 '데이터 제출'
          >

            {({ values, handleSubmit, handleChange }) => (
              <div className = "change-password-wrapper">
                  <Form layout = "vertical" autoComplete = "off" onFinish = { handleSubmit }>
                      <Form.Item className = "input-form" label = "* 현재 비밀번호">
                          <Input.Password value = { values.nowPassword } name = "nowPassword" onChange = { handleChange } />
                              <div className = "error-message">
                                  <ErrorMessage name = "nowPassword" />
                              </div>
                      </Form.Item>

                    <Form.Item className = "input-form" label = "* 변경할 비밀번호">
                        <Input.Password value = { values.userPassword } name = "userPassword" onChange = { handleChange } />
                              <div className = "error-message">
                                  <ErrorMessage name = "userPassword" />
                              </div>
                    </Form.Item>

                    <Form.Item className = "input-form" label = "* 변경할 비밀번호 확인">
                        <Input.Password value = { values.userPassword2 } name = "userPassword2" onChange = { handleChange } />
                              <div className = "error-message">
                                  <ErrorMessage name = "userPassword2" />
                              </div>
                    </Form.Item>

                    <Form.Item>
                        <Button type = "primary" htmlType = "submit" style = {{ marginLeft: "380px" }}>
                        변경하기
                        </Button>
                    </Form.Item>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

/* 3. 처리 */
// ChangePassword 함수 내보내기기
export default ChangePassword;
