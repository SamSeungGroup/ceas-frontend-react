/* <삼승 CEAS 페이지 - 판매자 1:1 문의> */
//   - 설명: '회원'이 '상품 판매자'에게 '1:1 문의내용'을 작성하여 '상품 판매자'에게 '이메일'을 보낼 수 있는 페이지

/* 1. 모듈 및 컴포넌트 추가 */
// 1-1. 'use 훅' 컴포넌트 추가
import { useParams } from "react-router-dom";                     // react-router-dom 모듈: '웹'에서의 '라우팅' 
                                                                  // - useSearchParams 훅 컴포넌트: '현재 URL'에서 '쿼리 파라미터' 검색

// 1-2. 'UI' 컴포넌트 추가
import { Button, TextField } from "@mui/material";                // Material UI: 'CSS 프레임워크' 
                                                                  // - Button 컴포넌트: '버튼'
                                                                  // - TextField 컴포넌트: '입력창'
import "react-toastify/dist/ReactToastify.css";                   // ReactToastify.css 모듈: '알림창' 스타일링

// 1-3. '알림창' 컴포넌트 추가
import { toast, ToastContainer } from "react-toastify";           // react-toastify 모듈: '알림창' 표시 
                                                                  // - toast 컴포넌트: '알림창' 생성
                                                                  // - ToastContainer 컴포넌트: '알림창' 렌더링

// 1-4. '로그인 관리'를 위한 모듈 및 컴포넌트 추가
import * as Yup from "yup";                                       // yup 모듈: '입력폼(form)에서 입력된 값'의 '유효성 검증'
import { Formik, ErrorMessage } from "formik";                    // formik 모듈: 입력폼 '상태' 관리 
                                                                  // - Formik 컴포넌트: 입력폼 'state' 관리
                                                                  // - ErrorMessage 컴포넌트: 입력폼 '오류 메시지' 렌더링

// 1-5. '비동기 통신'을 위한 컴포넌트 추가
import axios from "axios";                                        // axios 모듈: '비동기 HTTP 통신' 이용 -> 'REST API' 호출
import api from "../../utils/api";

// 1-6. 'Redux' 사용을 위한 컴포넌트 추가
import { useSelector } from "react-redux";                        // react-redux 모듈: '컴포넌트 바깥'에서 '상태 관리' 
                                                                  // - useSelector 훅 컴포넌트: 'redux store'에 저장된 '상태값'을 찾아 반환

// 1-7. '이메일' 기능을 위한 모듈 추가
import emailjs, { init } from "emailjs-com";                      // emailjs-com 모듈: '이용자의 요청'에 따라 '이메일 수신'이 가능한 모듈
                                                                  // - emailjs 컴포넌트: 'emailjs' 기능 이용
                                                                  // - init 컴포넌트: 'emailjs'에서 '관리자 정보' 초기화(설정)

// 1-8. 'SCSS' 모듈 추가
import "./enquiry-to-seller.scss";                                // signup 모듈: '회원가입 페이지' 스타일링을 '로그인 스타일링'에 이용

/* 2. 함수 설정 */
// EnquiryToSeller 함수: '회원'이 '상품 판매자'에게 '1:1 문의내용'을 작성하여 '상품 판매자'에게 '이메일'을 보낼 수 있는 기능 구현 + 화면 표시
const EnquiryToSeller = () => {
  // [1] 변수 설정
  const { product_id } = useParams();
  const id = useSelector(state => state.Id.id);                // id 변수: 'redux store'에서 'id'를 받아 저장 

  const validationSchema = Yup.object().shape({                // validationSchema 변수: '입력된 값의 유효성 검증' 기능 저장
                                                               // object.shape 메소드: '유효성 검증'을 위한 객체 생성

    // (*) '로그인 데이터 검증' 필드 모음
    //      - 'enquiryTitle' 필드: 문의제목
    //      - 'enquiryContent' 필드: 문의내용
    
    // (1) '문의제목 입력' 검증
    enquiryTitle: Yup.string()
    .required("제목을 입력하세요."),                           // required 메소드: '필수 입력 안내 메시지' 표시

    // (2) '문의내용 입력' 검증
    enquiryContent: Yup.string()       
    .required("문의내용을 입력하세요."),                       // required 메소드: '필수 입력 안내 메시지' 표시
  }); 

  // [2] 함수 설정
  // init 메소드: 'emailjs'에서 '관리자 정보' 초기화(설정)
  init("R-PiOT-49i6isZGEQ");

  // submit 함수: 비동기(async) 함수, '문의 제출' 여부 검증 
  const submit = async (values) => {                                    // value 매개변수: '회원'이 입력한 '문의제목/문의내용' 데이터를 받아옴
    // (1) 변수 설정
    const { enquiryTitle, enquiryContent } = values;                    // values 값을 '구조 분해 할당'하여 '인수값' 분리

    // (2) 처리
    // (2-1) '문의 보내기' 처리
    // try -> '문의 보내기 성공' 처리
    try {
        // (1-1) '회원 정보 데이터' 수신
        const userData  = await api.get(`/users/${id}`)                  // axios.get 메소드: '서버 주소'로부터 '데이터' 수신: userName, userEmail
                                                                         // userData 객체: userName, userEmail 저장
 
        // (1-2) '상품 상세 정보'에서 '판매자 이메일 데이터' 수신
        const sellerData = await axios.get(`http://localhost:8080/products/${product_id}`); // axios.get 메소드: '서버 주소'로부터 '데이터' 수신: userEmail
                                                                                            // sellerData 객체: userEmail 저장

        // (2) '이메일 템플릿' 생성('서버'로부터 받아온 '회원 정보 데이터' 저장)
        const emailTemplate = {
            userName: userData.data.data.userName,               // userName 필드: 회원 이름
            userEmail: userData.data.data.userEmail,             // userEmail 필드: 회원 이메일   
            sellerEmail: sellerData.data.data.seller.userEmail,  // sellerData 필드: 판매자 이메일
            enquiryTitle: enquiryTitle,                          // enquiryTitle 필드: 문의 제목 
            enquiryContent: enquiryContent                       // enquiryContent 필드: 문의 내용
        }; 

        // (3) '입력한 이메일'로 '비밀번호 발송 성공' 알림창 표시
        toast.success(
          <div>
          문의내용을 성공적으로 보냈습니다! 확인 후 빠르게 답변드리겠습니다. 
          </div>,

          {   
              position: "top-center",             // position 필드: toast 메시지 '위치' 설정 -> '상단 가운데'로 조정
              autoClose: 2000,                    // autoClose 필드: toast 메시지가 '자동으로 닫히는 시간' 설정 -> '2초'로 조정
          },
      );

        // (4) 'emailjs'에 '수신받을 내용 및 관련 정보' 송신
        emailjs.send("CEAS_Enquiry-to-Seller", "samseung_ceas_enquiry", emailTemplate, "R-PiOT-49i6isZGEQ");
        // send 메소드: 'emailjs 서버'에 정보 송신
        // - 첫 번째 인수값: Service ID
        // - 두 번째 인수값: Template ID
        // - 세 번째 인수값: 이메일로 받을 데이터 템플릿
        // - 네 번째 인수값: 관리자 정보 코드

        // (5) setTimeout 함수: '일정 시간'이 지난 후 '원하는 함수'를 '예약 실행(호출)'할 수 있게 함(호출 스케줄링)
        setTimeout(() => {

        }, 2000);                                      // 일정 시간: 2초
    } 
     
    // catch -> '문의 보내기 실패' 처리
    catch (e) {
      // (2-1-1) '서버'로부터 받은 '에러' 알림창 표시
      toast.error(<div>문의내용 전송에 실패했습니다.</div>, {
        position: "top-center",                         // position 필드: toast 메시지 '위치' 설정 -> '상단 가운데'로 조정
      });   
    }
  };

  // (3) 처리
  // (3-1) 화면 렌더링
  return (
    <Formik
      initialValues={{                        // initialValues 속성: '입력폼(form)'에서 사용할 '상태의 초깃값' 설정 -> '로그인 데이터'로 설정
        enquiryTitle: "",                     // enquiryTitle 필드: 문의제목
        enquiryContent: ""                    // enquiryContent 필드: 문의내용
      }}
      validationSchema = { validationSchema } // validationSchema 속성: '입력폼(form)'에서 '유효성 검증'
      onSubmit = { submit }                   // onSubmit 속성: '입력폼(form)'에 입력된 '데이터 제출'
    >

      {({values, handleSubmit, handleChange}) => (
        <div className = "enquiry-to-seller-wrapper">
          <img className = "enquiry-to-seller_image" src = "../../image/enquiry-to-seller_icon.png"/>
          <h1 className = "enquiry-to-seller-title">판매자 1:1 문의</h1>
          <p style = {{ textAlign: "center"}}>
            회원가입 시 입력하셨던 이메일 주소로 문의답변을 보내드립니다.<br/>
            결제, 환불 등 상품 관련 문의사항을 남겨주시면 빠른 시일 내에 답변드리겠습니다.
          </p>

          <ToastContainer />

          <form onSubmit = { handleSubmit } autoComplete = "off">
            <div className = "input-forms">
              <div className = "input-forms-item">
                <div className = "input-label" style = {{ marginTop: "-30px" }}>제목</div>
                
                <TextField 
                    name = "enquiryTitle" 
                    value = { values.enquiryTitle } 
                    variant = "outlined" 
                    placeholder = "문의 제목을 작성해 주세요."
                    onChange = { handleChange }
                    style = {{ width: "600px" }}
                />

                <div className = "error-message">
                  <ErrorMessage name = "enquiryTitle"/>
                </div>
              </div>

              <div className = "input-forms-item">
                <div className = "input-label">문의내용</div>

                <TextField 
                  name = "enquiryContent" 
                  value = { values.enquiryContent }  
                  variant = "outlined" 
                  type = "password" 
                  onChange = { handleChange }
                  placeholder = "문의하실 내용을 작성해 주세요."
                  multiline
                  fullWidth
                  rows = { 20 }
                />

                <div className = "error-message">
                  <ErrorMessage name = "enquiryContent"/>
                </div>
              </div>

              <Button 
                color = "primary" 
                variant = "contained"  
                type = "submit"
                fullWidth
                style = {{
                    fontSize: "15px",
                    height: "50px"
                }}
               >
                문의내용 보내기
              </Button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

/* 3. 처리 */
// Login 함수 내보내기
export default EnquiryToSeller;