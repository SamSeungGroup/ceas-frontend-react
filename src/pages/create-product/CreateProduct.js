/* <삼승 CEAS 페이지 - 상품 등록> */
//   - 설명: '회원'이 '상품 등록'을 할 수 있는 페이지

/* 1. 모듈 및 컴포넌트 추가 */
// 1-1. 'use 훅' 컴포넌트 추가
import { useSelector } from "react-redux";                 // react-redux 모듈: '컴포넌트의 데이터들'을 'redux store'에서 '상태 관리' 
                                                           // - useSelecter 훅 컴포넌트: 'redux store'에 저장된 '상태값'을 찾아 반환
import { useNavigate } from "react-router-dom";            // react-router-dom 모듈: '웹'에서의 '라우팅' 
                                                           // - useNavigate 훅 컴포넌트: '페이지 이동'
import { useCallback, useState } from "react";             // react 라이브러리: '메타'에서 개발한 '오픈 소스 자바스크립트 라이브러리' 
                                                           // - useCallback 훅 컴포넌트: '불필요한 컴포넌트 재렌더링 방지' 용도
                                                           // - useState 훅 컴포넌트: '상태 관리'

// 1-2. 'UI' 컴포넌트 추가
import { Button } from "@mui/material";                    // Material UI: CSS 프레임워크 
                                                           // - Button 컴포넌트: '버튼'

// 1-3. '알림창' 컴포넌트 추가
import { toast, ToastContainer } from "react-toastify";    // react-toastify 모듈: '알림창' 표시
                                                           // - toast 컴포넌트: '알림창' 생성
                                                           // - ToastContainer 컴포넌트: '알림창' 렌더링
import "react-toastify/dist/ReactToastify.css";            // ReactToastify.css 모듈: '알림창' 스타일링

// 1-4. 'UI 기능' 컴포넌트 추가
import ImageUploader from "../../components/ImageUploader"; // ImageUploader 컴포넌트: '상품 이미지 업로드' 기능
import TextArea from "../../components/TextArea";           // TextArea 컴포넌트: '상품 이름', '상품 가격', '상품 설명' 작성 기능

// 1-5. '비동기 통신'을 위한 모듈 및 컴포넌트 추가
import api from "../../utils/api";                          // api 컴포넌트: '비동기 HTTP 통신' 이용 -> REST API 호출 + '인터셉터' 기능 

// 1-6. 'SCSS' 모듈 추가
import "./createproduct.scss";                              // createproduct 모듈: '상품 등록' 페이지 스타일링

/* 2. 함수 설정 */
// CreateProduct 함수: '상품 등록'을 할 수 있는 기능 구현 + 화면 표시
const CreateProduct = () => {
    // [1] 변수 설정
    const token = useSelector(state => state.Auth.token);  // token 변수: 'redux store'에서 '토큰'을 받아 저장
    const id = useSelector(state => state.Id.id);          // id 변수: 'redux store'에서 'id'를 받아 저장

    // [2] '상태 관리' 설정
    const [ product_name, setProductName ] = useState("");               // '상품 이름' 상태 관리 -> product_name 변수: '상품 이름' 저장, setProductName 함수: '상품 이름' 조작
    const [ product_price, setProductPrice ] = useState("");             // '상품 가격' 상태 관리 -> product_price 변수: '상품 가격' 저장, setProductPrice 함수: '상품 가격' 조작
    const [ product_description, setProductDescription ] = useState(""); // '상품 설명' 상태 관리 -> product_description 변수: '상품 설명' 저장, setProductDescription 함수: '상품 설명' 조작
    const [ product_image, setProductImage ] = useState({                // '상품 이미지' 상태 -> product_image 변수: '상품 이미지' 저장, setProductImage 함수: '상품 이미지' 조작
        image_file: "",                                                  //  - image_file 필드: '파일 탐색기'에서 '선택된 파일' 저장
        preview_URL: "../../image/default_image.png"                     //  - preview_URL 필드: '기본 이미지 주소' 저장 
    });

    // [3] 함수 설정
    const navigate = useNavigate(); // navigate 함수: '페이지 이동' 기능 설정

    // [4] 함수 재랜더링 관리
    // canSubmit 함수: '상품 정보 데이터'를 서버에 '송신'할 수 있는지 검사 -> '입력란'이 '공백'이 아닌지 검사
    //                 -> 상품 정보 데이터 목록: '상품 이미지', '상품 이름', '상품 가격', '상품 설명'
    const canSubmit = useCallback(() => {
        return product_image.image_file !== "" && product_name !== "" && product_price !== "" && product_description !== "" ;
    },[ product_image, product_name, product_price, product_description ]);
    
    // handleSubmit 함수: '비동기(async) 함수', '상품 정보 데이터'를 '서버'에 송신
    const handleSubmit = useCallback(async () => {
        // try -> '상품 등록 성공' 처리
        try {
            // (1) '폼 데이터' 생성
            const formData = new FormData();                                                             // formData 변수: '입력된 상품 정보 데이터'를 저장

            // (2) '폼 데이터'에 '상품 정보 데이터' 추가
            formData.append("image", product_image.image_file);                                          // append 메소드: '데이터' 추가 -> '상품 이미지' 추가
            formData.append("dto", new Blob([JSON.stringify({                                            // append 메소드: '데이터' 추가 
                'productPrice': product_price,                                                           // -> productPrice 필드: '상품 가격' 추가
                'productName': product_name,                                                             // -> productName 필드: '상품 이름' 추가
                'productDescription': product_description                                                // -> productDescription 필드: '상품 설명' 추가
            })], { type: "application/json" }));                                                         // -> type 필드: application/json 타입으로 전송

            // (3) '상품 정보 데이터'를 '서버'에 송신
            await api.post("/products", formData, { headers: {"Content-Type" : "multipart/form-data"}}); // api.post 메소드: '서버 주소'로 '데이터' 송신 -> '상품 정보 데이터' 송신
                                                                                                         //                   -> productImage, productName, productPrice, productName, productDescription 

            // (4) '상품 등록 완료' 알림창 표시
            alert("상품이 등록되었습니다.");                                                             // alert 메소드: '화면 상단'에 '알림창' 표시 

            // (5) '상품 목록 페이지'로 이동
            navigate("/product-list")                                                                    // naviagte 함수: '페이지 이동' -> '상품 목록' 페이지로 이동
        }

        // catch -> '상품 등록 실패' 처리
        catch (e) {
            // (2-1-1) '서버'로부터 받은 '에러' 알림창 표시
            toast.error("상품 등록에 실패하였습니다.", {
                position: "top-center"                                                                  // position 필드: toast 메시지 '위치' 설정 -> '상단 가운데'로 조정
            });
        }
    },[ canSubmit ]);
    
    // [3] 처리
    // [3-1] 화면 렌더링
    return (
        <div className = "createproduct_wrapper">
            <ToastContainer/>
            
            <div className = "createproduct_header">
                <img className = "product-list_image" src = "../../image/create_product_icon.png"/>
                <div className = "product-list-title">상품 등록</div>
            </div>

            <div className = "submit_button">
                {canSubmit() ? (
                    <Button 
                        onClick = { handleSubmit } 
                        className = "sucess_button" 
                        variant = "outlined"
                        size = "large">
                        상품 등록
                    </Button>
                ) : (
                    <Button 
                        className = "disable_button" 
                        variant = "outlined" 
                        size = "large">
                        모든 정보를 입력해 주세요.
                    </Button>
                )}
            </div>

            <div className = "createproduct_body">
                <ImageUploader 
                    setProductImage = { setProductImage } 
                    preview_URL = { product_image.preview_URL } />
                
                <TextArea 
                    setProductName = { setProductName } 
                    setProductDescription = { setProductDescription } 
                    setProductPrice = { setProductPrice }
                    product_name = { product_name } 
                    product_price = { product_price }
                    product_description = { product_description } /> 
            </div>
        </div>
    );
}

/* 3. 처리 */
// CreateProduct 함수 내보내기
export default CreateProduct;