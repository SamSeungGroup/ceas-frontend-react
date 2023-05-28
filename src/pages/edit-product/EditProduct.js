/* <삼승 CEAS 페이지 - 상품 상세 정보 수정> */
//   - 설명: '회원'이 '상품 상세 정보를 수정'을 할 수 있는 페이지

/* 1. 모듈 및 컴포넌트 추가 */
// 1-1. 'use 훅' 컴포넌트 추가
import { useSelector } from "react-redux";                 // react-redux 모듈: '컴포넌트의 데이터들'을 'redux store'에서 '상태 관리' 
                                                           // - useSelecter 컴포넌트 훅: 'redux store'에 저장된 '상태값'을 찾아 반환
import { useNavigate, useParams } from "react-router-dom"; // react-router-dom 모듈: '웹'에서의 '라우팅' 
                                                           // - useNavigate 훅 컴포넌트: '페이지 이동'
                                                           // - useParams 훅 컴포넌트: '쿼리 파라미터' 검색
import { useCallback, useEffect, useState } from "react";  // react 라이브러리: '메타'에서 개발한 '오픈 소스 자바스크립트 라이브러리' 
                                                           // - useCallback 훅 컴포넌트: '불필요한 컴포넌트 재렌더링 방지' 
                                                           // - useEffect 훅 컴포넌트: '비동기 통신' 용도 
                                                           // - useState 훅 컴포넌트: '상태 관리'

// 1-2. 'UI' 컴포넌트 추가
import { Button } from "@mui/material";                    // Material UI: CSS 프레임워크 - Button 컴포넌트: 버튼

// 1-3. '알림창' 표시를 위한 컴포넌트 추가
import { toast } from "react-toastify";                    // react-toastify 모듈: '알림창' 이용 
                                                           // - toast 컴포넌트: '알림창' 생성
import "react-toastify/dist/ReactToastify.css";            // ReactToastify.css 모듈: '알림창' 스타일링

// 1-4. '삼승 CEAS UI 기능' 컴포넌트 추가
import ImageUploader from "../../components/ImageUploader"; // ImageUploader 컴포넌트: '상품 이미지 업로드' 기능
import TextArea from "../../components/TextArea";           // TextArea 컴포넌트: '상품 이름', '상품 설명' 작성 기능

// 1-5. '비동기 통신'을 위한 모듈 및 컴포넌트 추가
import api from "../../utils/api";                          // api 컴포넌트: '인터셉터' 기능 
import axios from "axios";                                  // axios 모듈: '비동기 HTTP 통신' 이용 - REST API 호출

// 1-6. 'SCSS' 모듈 추가
import "../create-product/createproduct.scss";               // createproduct 모듈: '상품 등록' 페이지 스타일링과 같이 적용

/* 2. 함수 설정 */
// EditProduct 함수: '상품 등록'을 할 수 있는 기능 구현 + 화면 표시
const EditProduct = () => {
    // [1] 변수 설정
    const { product_id } = useParams(); // product_id 필드: '쿼리 파라미터'로 '상품 아이디'를 받음

    // [2] 상태 관리
    // [2-1] '상품 수정 데이터' 관리
    const [ product_name, setProductName ] = useState("");               // '상품 이름' 상태 관리 -> product_name 변수: '상품 이름' 저장, setProductName 함수: '상품 이름' 조작
    const [ product_price, setProductPrice ] = useState("");             // '상품 가격' 상태 관리 -> product_price 변수: '상품 가격' 저장, setProductPrice 함수: '상품 가격' 조작
    const [ product_description, setProductDescription ] = useState(""); // '상품 설명' 상태 관리 -> product_description 변수: '상품 설명' 저장, setProductDescription 함수: '상품 설명' 조작
    const [ product_image, setProductImage ] = useState({                // '상품 이미지' 상태 -> product_image 변수: '상품 이미지' 저장, setProductImage 함수: '상품 이미지' 조작
        image_file: "",                                                  //  - image_file 필드: '파일 탐색기'에서 '선택된 파일' 저장
        preview_URL: "../../image/default_image.png"                     //  - preview_URL 필드: '기본 이미지 주소' 저장 
    });

    // [3] 처리
    // [3-1] '상품 상세 정보 데이터'를 '서버'로부터 수신
    useEffect(() => {
        // try -> '상품 상세 정보 데이터 수신 성공' 처리
        try{
            // (1) '상품 상세 정보 데이터'를 '서버'로부터 수신
            // getProduct 함수: '비동기(async)' 함수, '상품 상세 정보 데이터' 저장
            const getMyProduct = async () => {
                const { data } = await api.get(`/products/${product_id}`);  // axios.get 메소드: '서버 주소'로부터 '데이터' 수신 -> '상품 상세 정보 데이터' 수신

                return data;
            }

            // (2) '상품 정보 데이터'를 'setProductList 함수'에 설정
            getMyProduct().then((response) => {
                setProductName(response.data.productName);
                setProductPrice(response.data.productPrice);
                setProductDescription(response.data.productDescription);
                setProductImage({...product_image, preview_URL: `http://localhost:8080/images/product/${product_id}`})
            });
        }

        // catch -> '상품 정보 데이터 수신 실패' 처리
        catch(e){
            
        }
    }, []);

    // [3-2] 함수 재랜더링 관리
    // canSubmit 함수: '상품 상세 정보 데이터'를 서버에 '제출'할 수 있는지 검사
    //                 -> '상품 상세 정보 데이터 목록: '상품 이미지', '상품 이름', '상품 가격', '상품 설명' 
    const canSubmit = useCallback(() => {
        return product_image.image_file !== "" &&  product_name !== "" && product_price !== "" && product_description !== "" ;
    },[ product_image, product_name, product_price, product_description ]);
    
    // handleSubmit 함수: '비동기(async)' 함수, '상품 상세 정보 데이터'를 '서버'에 송신('상품 상세 정보 데이터' 수정)
    const handleSubmit = useCallback(async () => {
        // try -> '상품 수정 성공' 처리
        try {
            // (1) '폼 데이터' 생성
            const formData = new FormData();                                                                     // formData 변수: '내 정보 데이터'를 저장

            // (2) '폼 데이터'에 '상품 정보 데이터' 추가
            // formData.append("product_image", product_image.image_file);                                        // append 메소드: '데이터' 추가 -> '상품 이미지' 추가
            formData.append("image", product_image.image_file);                                                   // append 메소드: '데이터' 추가 -> '회원 이미지' 추가
            formData.append("dto", new Blob([JSON.stringify({                                                     // append 메소드: '데이터' 추가 
                'id': product_id,                                                                                 // -> product_id 필드: '상품 아이디' 추가
                'productName': product_name,
                'productPrice': product_price,
                'productDescription': product_description,
            })], { type: "application/json" }));                                                                  // -> type 필드: application/json 타입으로 전송

            // (3) '상품 정보 데이터'를 '서버'에 송신
            await api.put(`/products/${product_id}`, formData, { headers: { "Content-Type": "multipart/form-data"}}); // api.post 메소드: '서버 주소'로 '데이터' 송신 -> '수정된 상품 상세 정보 데이터' 송신

            // (4) '상품 수정 완료' 알림창 표시 
            alert("상품 정보가 수정되었습니다.");                                                                  // alert 메소드: '화면 상단'에 '알림창' 표시 

            // (5) '이전 페이지'로 이동
            window.location.href = "/product-list";                                                                // location.href 필드: '페이지 이동' -> '상품 목록 페이지'로 이동
        }

        // catch -> '상품 등록 실패' 처리
        catch (e) {
            // (2-1-1) '서버'로부터 받은 '에러' 알림창 표시
            toast.error("상품 등록에 실패하였습니다.", {
                position: "top-center"                                                                             // position 필드: toast 메시지 '위치' 설정 -> '상단 가운데'로 조정
            });
        }
    },[ canSubmit ]);
    
    // [3-3] 화면 렌더링
    return (
        <div className = "createproduct_wrapper">
            <div className = "createproduct_header">
                <img className = "product-list_image" src = "../../image/edit-product_icon.png"/>
                <div className = "product-list-title">상품 수정</div>
            </div>

            <div className = "submit_button">
                {canSubmit() ? (
                    <Button 
                        onClick = { handleSubmit } 
                        className = "sucess_button" 
                        variant = "outlined"
                        size = "large">
                        상품 수정
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
export default EditProduct;