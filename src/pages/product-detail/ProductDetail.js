/* <삼승 CEAS 페이지 - 상품 상세 정보(상품 조회)> */
//   - 설명: '상품 상세 정보'를 화면에 표시

/* 1. 모듈 및 컴포넌트 추가 */
// 1-1. 'React' 라이브러리 + 'use 훅' 컴포넌트 추가 
import React, { useEffect, useState } from "react";                                          // react 라이브러리: '메타'에서 개발한 '오픈 소스 자바스크립트 라이브러리'
                                                                                             // - React 컴포넌트: 'React' 요소 사용 
                                                                                             // - useEffect 훅 컴포넌트: '비동기 통신' 
                                                                                             // - useState 훅 컴포넌트: '상태 관리'
import { useNavigate, useParams } from "react-router-dom";                                   // react-router-dom 모듈: '웹'에서의 '라우팅' 
                                                                                             // - useNavigate 컴포넌트: '페이지 이동'
                                                                                             // - useParams: '현재 URL'에서 '파라미터'를 가져옴
import { useSelector } from "react-redux";                                                   // react-redux 모듈: '컴포넌트 바깥'에서 '상태 관리' 
                                                                                             // - useSelector 훅 컴포넌트: 'redux store'에 저장된 '상태값'을 찾아 반환

// 1-2. 'UI' 컴포넌트 추가
import { Button, Dialog, DialogContent, IconButton } from "@mui/material";                   // Material UI: 'CSS 프레임워크'
                                                                                             // - Button 컴포넌트: '버튼'
                                                                                             // - Dialog 컴포넌트: '다이얼로그'
                                                                                             // - DialogContent 컴포넌트: '다이얼로그 내부에서의 내용'
                                                                                             // - IconButton 컴포넌트: '아이콘 버튼'
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";                           // - BuildOutlinedIcon 컴포넌트: '수정' 아이콘
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';           // - DeleteForeverOutlinedIcon 컴포넌트: '삭제' 아이콘
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";   // - DisabledByDefaultOutlinedIcon 컴포넌트: 

// 1-3. '비동기 통신'을 위한 모듈 및 컴포넌트 추가
import axios from "axios";                                                                   // axios 모듈: '비동기 HTTP 통신' 이용 -> REST API 호출
import api from "../../utils/api";                                                           // api 컴포넌트:  '비동기 HTTP 통신' 이용 -> REST API 호출 + '인터셉터' 기능
import { jwtUtils } from "../../utils/jwtUtils";                                             // jwtUtils 컴포넌트: '토큰'을 이용한 '이용자 계정' 보안

// 1-4. 'SCSS' 모듈 추가
import "./productdetail.scss";                                                               // productdetail 모듈: '상품 상세 정보' 페이지 스타일링

// 1-5. '삼승 CEAS UI 기능 컴포넌트' 추가
import Comments from "../../components/Comments";                                            // Comments 컴포넌트: '댓글 작성' 기능

/* 2. 함수 설정 */
// ProductDetail 함수: '상품 상세 정보' 기능 구현 + 화면 표시
const ProductDetail = () => {
    // [1] 변수 설정
    const { product_id } = useParams();                                                // product_id 필드: 'useParams 훅'을 이용해 '상품 상세 정보' 페이지의 'URL 파라미터'인 '상품 상세 정보 아이디(product_id)'를 받아옴
    const token = useSelector(state => state.Auth.token);                              // token 변수: 'redux store'에서 '토큰'을 받아 저장
    const id = useSelector(state => state.Id.id);         

    // [2] 상태 관리
    // [2-1] '상품 상세 정보 데이터' 관리
    const [ productDetail, setProductDetail ] = useState([]);                          // '상품 상세 정보' 상태 관리 -> productDetail 변수: '상품 상세 정보' 저장, setProductDetail 함수: '상품 상세 정보' 데이터 조작
    const [ seller, setSeller ] = useState({});
    const [ isLoaded, setIsLoaded ] = useState(false);                                 // '상품 상세 정보 표시 여부' 상태 관리 -> isLoaded 변수: '상품 상세 정보 표시' 여부 저장, setIsLoaded 함수: '상품 상세 정보 표시 여부 조작
    const [ productDeleteModalShow, setProductdDeleteModalShow ] = useState(false);    // '상품 삭제 모달창' 표시 여부 상태 관리 -> productDeleteModalShow 변수: '모달창이 표시'되었는지 여부 저장, setProductDeleteModalShow 함수: '모달창 표시 여부' 조작 

    // [2-2] '구매자 데이터' 관리
    const [ userId, setUserId ] = useState("");                                        // '회원(구매자) 아이디' 상태 관리 -> userId 변수: '회원 아이디' 저장, setUserId 함수: '회원 아이디' 조작

    // [3] 함수 설정
    // navigate 함수: '페이지 이동' 기능 설정
    const navigate = useNavigate();         

    // [4] 처리
    // [4-1] '상품 상세 정보 데이터'를 '서버'로부터 수신
    useEffect(() => {
        // try -> '상품 상세 정보 데이터 수신 성공' 처리
        try{
            // (1) '상품 상세 정보 데이터'를 '서버'로부터 수신
            // getProductDetail 함수: '비동기(async)' 함수, '상품 상세 정보 데이터' 저장
            const getProductDetail = async () => {
                const { data } = await api.get(`/products/${product_id}`); // axios.get 메소드: '서버 주소'로부터 '데이터' 수신 -> '상품 상세 정보 데이터' 수신
                                                                           //                    : product_id, product_name, product_img, product_price, product_description, product_price,
                                                                           //                      product_description, product_createDate, userId, product_positive 
                console.log(data);  
                                                                                             
                return data;
            }

            // (2) '상품 상세 정보 데이터'를 'setProductDetail' 함수에 적용 + '상품이 로드'되었다고 설정
            getProductDetail().then((response) => {
                setProductDetail(response.data);
                setSeller(response.data.seller);
            });
            
            setIsLoaded(true);
        }

        // catch -> '상품 상세 정보 데이터 수신 실패' 처리
        // (1) '상품 상세 정보 데이터'가 로드되지 않았다고 설정
        catch(e){
            setIsLoaded(false);
        }
    }, []);

    // [4-2] '상품 상세 정보 데이터'를 '결제 정보'에 등록
    // loadPayment 함수: '결제 정보' 등록 + '결제창'을 화면에 표시
    const loadPayment =  () => {
        // (1) 변수 설정
        // (1-1) '가맹점 식별' 기능 생성
        const { IMP } = window;                                            // IMP 객체: '아임포트' 기능 생성

        // (2) 처리
        // (2-1) '가맹점 식별코드' 설정
        // init 메소드: '가맹점 식별코드' 초기화
        IMP.init("imp34677742");                                           // init 메소드 매개변수: '본인고유가맹점번호' // ---> IMP.init(productDetail.IMP)      

        // (2-2) '결제할 상품 정보 데이터' 설정
        // purchase_data 객체: '결제할 상품 정보 데이터' 저장
        const purchaseData = {
            pg: "html5_inicis.INIpayTest",                                 // pg 필드: PG사(필수 항목)                   // ---> pg: productDetail.PG
            pay_method: "card",                                            // pay_method 필드: 결제 수단(필수 항목)
            merchant_uid: "20230311",                                      // merchant_uid 필드: 결제 번호
            name: productDetail.productName,                               // name 필드: 결제 상품 이름
            amount: productDetail.productPrice,                            // amount 필드: 결제 상품 금액(필수 항목)
            buyer_name: "송정우", //userName,                                          // buyer_name 필드: 구매자 이름
            buyer_email: "sjw9664@naver.com", // userEmail,                                        // buyer_email 필드: 구매자 이메일 주소
            impUid: "",                                                    // impUid 필드: ???
        };

        // (2-3) '결제 요청'
        // request_pay 메소드: '결제창 호출' 기능 설정
        IMP.request_pay(
            // (2-3-1) '결제 상품 정보' 초기화
            {
                pg: purchaseData.pg,                                       // pg 필드: PG사 
                pay_method: purchaseData.pay_method,                       // pay_method 필드: 결제 수단
                merchant_uid: purchaseData.merchant_uid,                   // merchant_uid 필드: 결제 번호
                name: purchaseData.name,                                   // name 필드: 결제 상품 이름
                amount: purchaseData.amount,                               // amount 필드: 결제 상품 금액
                buyer_name: purchaseData.buyer_name,                       // buyer_name 필드: 구매자 이름
                buyer_email: purchaseData.buyer_email,                     // buyer_email 필드: 구매자 이메일 주소
            },

            // (2-3-2) '결제' 처리
            // callback 함수: '결제' 처리
            function callback(response) {
                // (2-3-2-1) '결제 성공' 처리
                if (response.success) {                                     // response.sucess 매개변수: '결제 성공 정보' 수신
                    
                } 

                // (2-3-2-2) '결제 실패' 처리                               // response.error_msg 매개변수: '결제 실패 정보' 수신
                else { 
                    alert(`결제 실패: ${response.error_msg}`);              // alert 메소드: '알림창' 표시 -> '결제 실패' 알림창 표시
                }
            }
        );
    }

    // [4-2] 화면 렌더링
    return (
        <React.Fragment>
            {isLoaded && (
                <div className = "product-detail_wrapper">
                    {
                        jwtUtils.isAuth(token) && id === seller.id &&
                        <div className = "edit-delete_button">
                            <Button 
                                variant = "outlined" 
                                endIcon = { <BuildOutlinedIcon/> } 
                                style = {{
                                    fontSize: "13px",
                                    width: "90px"
                                }}
                                onClick = { () => { navigate(`/edit-product/${product_id}`)}}>
                                수정
                            </Button>      

                            <Button
                                variant = "outlined" 
                                color = "error"
                                endIcon = { <DeleteForeverOutlinedIcon /> } 
                                style = {{
                                    fontSize: "13px",
                                    width: "90px",
                                }}
                                className = "delete_button" 
                                onClick = { () => { setProductdDeleteModalShow(true); }}>
                                삭제
                            </Button>   
                        </div>
                    }

                    <div className = "product-detail_header">
                        <div className = "product-detail-product-name">{ productDetail.productName }</div>
                    </div>

                    <hr className = "product-detail_top-hr"/>

                    <div className = "product-detail_body">
                        <div className = "product-detail_image">
                            <img src = {  `http://localhost:8080/images/product/${product_id}` }/>
                        </div>

                        <div className = "product-detail-title-content">
                            <h2 className = "product-detail_description">판매자</h2>
                            <div className = "product-detail_description">{ seller.userName }</div>

                            <h2 className = "product-detail_description">상품 가격</h2>
                            <div className = "product-detail_description">{ productDetail.productPrice }원</div>

                            <h2 className = "product-detail_description">상품 설명</h2>
                            <div className = "product-detail_description">{ productDetail.productDescription }</div>
                        </div>
                    </div>

                    <div className = "purchase_button">
                        <Button
                            color = "secondary"
                            variant = "contained"
                            fullWidth
                            style = {{
                                height: "50px"
                            }}
                            onClick = { loadPayment }
                        >
                        결제하기
                        </Button>
                    </div>

                    <hr className = "product-detail_bottom-hr"/>

                    <div className = "product-detail_footer">
                        <Comments product_id = { product_id } productPostivie = { productDetail.productPositive } />
                    </div>
                </div>
            )}

            <Dialog open = { productDeleteModalShow }>
                <DialogContent style = { { position: "relative" } }>
                    <IconButton 
                        style = { { position: "absolute", top: "0", right: "0"}} 
                        onClick = { () => setProductdDeleteModalShow(false) }>
                        <DisabledByDefaultOutlinedIcon/>
                    </IconButton>

                    <div className = "modal">
                        <div className = "modal-title">정말 삭제하시겠습니까?</div>
                        
                        <div className = "modal-button">
                            <Button 
                                variant = "outlined" 
                                color = "error" 
                                onClick = { async () => { 
                                    setProductdDeleteModalShow(false);

                                    await api.delete(`/products/${product_id}`);

                                    alert("해당 상품이 삭제되었습니다.");

                                    window.location.href = "/product-list";
                                }}
                            >
                            예
                            </Button>

                            <Button 
                                variant = "outlined" 
                                color = "primary" 
                                onClick = { () => setProductdDeleteModalShow(false) }>
                                아니오
                            </Button>
                        </div>
                    </div>         
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

/* 3. 처리 */
// ProductDetail 함수 내보내기
export default ProductDetail;