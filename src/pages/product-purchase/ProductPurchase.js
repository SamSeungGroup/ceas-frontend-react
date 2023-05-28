/* <삼승 CEAS 페이지 - 상품 등록> */
//   - 설명: '회원'이 '상품 등록'을 할 수 있는 페이지

/* 1. 모듈 및 컴포넌트 추가 */
// 1-1. 'use 훅' 컴포넌트 추가 
import { useEffect } from "react";                          // react 라이브러리: '메타'에서 개발한 '오픈 소스 자바스크립트 라이브러리'
                                                            // - useEffect 훅 컴포넌트: '비동기 통신' 
import { useSelector } from "react-redux";                  // react-redux 모듈: '컴포넌트의 데이터들'을 'redux store'에서 '상태 관리' 
                                                            // - useSelecter 훅 컴포넌트: 'redux store'에 저장된 '상태값'을 찾아 반환
import { useParams } from "react-router-dom";               // react-router-dom 모듈: '웹'에서의 '라우팅' 
                                                            // - useParams: '현재 URL'에서 '파라미터'를 가져옴
import { useCallback, useState } from "react";              // react 라이브러리: '메타'에서 개발한 '오픈 소스 자바스크립트 라이브러리' 
                                                            // - useCallback 훅 컴포넌트: '불필요한 컴포넌트 재렌더링 방지' 용도
                                                            // - useState 훅 컴포넌트: '상태 관리'

// 1-2. 'UI' 컴포넌트 추가
import { Button } from "@mui/material";                    // Material UI: CSS 프레임워크 
                                                           // - Button 컴포넌트: '버튼'

// 1-3. '알림창' 컴포넌트 추가
import { ToastContainer } from "react-toastify";           // react-toastify 모듈: '알림창' 표시
                                                           // - ToastContainer 컴포넌트: '알림창' 렌더링
import "react-toastify/dist/ReactToastify.css";            // ReactToastify.css 모듈: '알림창' 스타일링

// 1-4. 'UI 기능' 컴포넌트 추가
import ProductPurchaseTextArea from "./ProductPurchaseTextArea";           // TextArea 컴포넌트: '상품 이름', '상품 가격', '상품 설명' 작성 기능

// 1-5. '비동기 통신'을 위한 모듈 및 컴포넌트 추가
import api from "../../utils/api";                          // api 컴포넌트: '비동기 HTTP 통신' 이용 -> REST API 호출 + '인터셉터' 기능 

// 1-6. 'SCSS' 모듈 추가
import "./productpurchase.scss";                            // createproduct 모듈: '상품 등록' 페이지 스타일링

/* 2. 함수 설정 */
// ProductPurcahse 함수: '상품 결제'를 할 수 있는 기능 구현 + 화면 표시
const ProductPurchase = () => {
    // [1] 변수 설정
    const { product_id } = useParams();                       // product_id 필드: 'useParams 훅'을 이용해 '상품 상세 정보' 페이지의 'URL 파라미터'인 '상품 상세 정보 아이디(product_id)'를 받아옴
    const token = useSelector(state => state.Auth.token);     // token 변수: 'redux store'에서 '토큰'을 받아 저장
    const id = useSelector(state => state.Id.id);             // id 변수: 'redux store'에서 'id'를 받아 저장

    // [2] '상태 관리' 설정
    // [2-1] '상품 상세 정보' 관리
    const [ productDetail, setProductDetail ] = useState([]); // '상품 상세 정보' 상태 관리 -> productDetail 변수: '상품 상세 정보' 저장, setProductDetail 함수: '상품 상세 정보' 데이터 조작
    const [ seller, setSeller ] = useState({});               // '판매자 정보' 상태 관리 -> seller 변수: '판매자 정보' 저장, setSeller 함수: '판매자 정보' 조작

    // [2-2] '구매자 입력 정보' 관리
    const [ buyerName, setBuyerName ] = useState("");               // '구매자 이름' 상태 관리 -> buyerName 변수: '구매자 이름' 저장, setBuyerName 함수: '구매자 이름' 조작
    const [ buyerEmail, setBuyerEmail ] = useState("");             // '구매자 이메일' 상태 관리 -> buyerEmail 변수: '구매자 이메일' 저장, setBuyerEmail 함수: '구매자 이메일' 조작
    const [ buyerPhoneNumber, setBuyerPhoneNumber ] = useState(""); // '구매자 전화번호' 상태 관리 -> buyerPhoneNumber 변수: '구매자 전화번호' 저장, setBuyerPhoneNumber 함수: '구매자 전화번호' 조작
    const [ buyerAddress, setBuyerAddress ] = useState("");         // '구매자 주문 주소' 상태 관리 -> buyerAddress 변수: '구매자 주문 주소' 저장, setBuyerAddress 함수: '구매자 주문 주소' 조작
    const [ productCount, setProductCount ] = useState("");         // '주문 상품 개수' 상태 관리 -> productCount: '주문 상품 개수' 저장, setProductCount 함수: '주문 상품 개수' 조작
    const [ buyerRequest, setBuyerRequest ] = useState("");         // '구매자 요청사항' 상태 관리 -> buyerRequest 변수: '구매자 요청사항' 저장, setBuyerRequest 함수: '구매자 요청사항' 조작

    // [2-3] '구매자 기본 정보' 관리
    const [ userEmail, setUserEmail ] = useState("");

    // [3] 함수 재랜더링 관리
    // canSubmit 함수: '결제 정보 데이터'를 서버에 '송신'할 수 있는지 검사 -> '입력란'이 '공백'이 아닌지 검사
    //                 -> 결제 정보 데이터 목록: '구매자 이름', '구매자 이메일', '구매자 전화번호', '구매자 주문 주소', '주문 상품 개수', '구매자 요청 사항'
    const canSubmit = useCallback(() => {
        return buyerName !== "" && buyerEmail !== "" && buyerPhoneNumber !== "" && buyerAddress !== "" && productCount !== "" && buyerRequest !== "";
    },[ buyerName, buyerEmail, buyerPhoneNumber, buyerAddress, productCount, buyerRequest ]);
    
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
                                                                                             
                return data;
            }

            // (2) '상품 상세 정보 데이터'를 'setProductDetail' 함수에 적용 + '상품이 로드'되었다고 설정
            getProductDetail().then((response) => {
                setProductDetail(response.data);
                setSeller(response.data.seller);
            });
        }

        // catch -> '상품 상세 정보 데이터 수신 실패' 처리
        // (1) '상품 상세 정보 데이터'가 로드되지 않았다고 설정
        catch(e){
        }
    }, []);

     // [4-2] '회원 이메일 정보 데이터'를 '서버'로부터 수신
    useEffect(() => {
        // try -> '내 정보 데이터 수신 성공' 처리
        try{
            // (1) '내 정보 데이터'를 '서버'로부터 수신
            // getUser 함수: '비동기(async)' 함수, '회원 정보 데이터' 저장
            const getUser = async () => {
                const { data } = await api.get(`http://localhost:8080/users/${id}`);                 // axios.get 메소드: '서버 주소'로부터 '데이터' 수신 -> '내 정보 데이터' 수신
                                                                                                     //                   : userEmail
    
                return data;
            }

            // (2) '내 정보 데이터'를 'setUserEmail' 함수에 설정
            getUser().then((response) => {
                setUserEmail(response.data.userEmail);                                                // '내 이메일 주소' 설정
            });
        }

        // catch -> '회원 정보 데이터 수신 실패' 처리
        catch(e){
            
        }
    }, []);

    // [4-3] '상품 상세 정보 데이터'를 '결제 정보'에 등록
    // loadPayment 함수: '결제 정보' 등록 + '결제창'을 화면에 표시
    const loadPayment =  () => {
        // (1) 변수 설정
        // (1-1) '가맹점 식별' 기능 생성
        const { IMP } = window;                                            // IMP 객체: '아임포트' 기능 생성

        // (2) 처리
        // (2-1) '가맹점 식별코드' 설정
        // init 메소드: '가맹점 식별코드' 초기화
        IMP.init(seller.impId);                                           // init 메소드 매개변수: '본인고유가맹점번호'    

        // (2-2) '결제할 상품 정보 데이터' 설정
        // purchase_data 객체: '결제할 상품 정보 데이터' 저장
        const purchaseData = {
            pg: seller.pgId,                                               // pg 필드: PG사(필수 항목)                  
            pay_method: "card",                                            // pay_method 필드: 결제 수단(필수 항목)
            merchant_uid: new Date().getTime().toString(),                 // merchant_uid 필드: 결제 번호
            name: productDetail.productName,                               // name 필드: 결제 상품 이름
            amount: productDetail.productPrice,                            // amount 필드: 결제 상품 금액(필수 항목)
            buyer_name: buyerName,                                         // buyer_name 필드: 구매자 이름
            buyer_email: userEmail,                                        // buyer_email 필드: 구매자 이메일 주소
            buyer_tel: buyerPhoneNumber,                                   // buyer_tel 필드: 구매자 전화번호
            buyer_addr: buyerAddress,                                      // buyer_addr 필드: 구매자 구매 주소
            impUid: "",                                                    // impUid 필드: ???
        };

        console.log(purchaseData);

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
                buyer_tel: purchaseData.buyer_tel,                         // buyer_tel 필드: 구매자 전화번호
                buyer_addr: purchaseData.buyer_addr,                       // buyer_addr 필드: 구매자 구매 주소
            },

            // (2-3-2) '결제' 처리
            // callback 함수: '결제' 처리
            function callback(response) {
                // (2-3-2-1) '결제 성공' 처리
                if (response.success) {                                    // response.sucess 매개변수: '결제 성공 정보' 수신
                    // 1. '결제 정보' 등록
                    const { data } = api.post(`/payments/products/${product_id}`, 
                        {
                            "impUid": response.imp_uid,                    // impUid 필드:
                            "merchantUid": response.merchant_uid,          // merchantUid 필드: 
                            "productName": response.name,                  // productName 필드:
                            "paidAmount": response.paid_amount,            // paidAmount 필드:
                            "paidMilliseconds": response.paid_at*1000,     // paidMilliseconds 필드:
                            "paidDate": new Date(response.paid_at*1000),   // paidDate 필드:
                            "payMethod": response.pay_method,              // payMethod 필드:
                            "pgProvider": response.pg_provider,            // pgProvider 필드:
                            "status": response.status,                     // status 필드:  
                            "success": response.success                    // success 필드:
                        })

                        alert('결제 성공');
                    } 
                // (2-3-2-2) '결제 실패' 처리                               // response.error_msg 매개변수: '결제 실패 정보' 수신
                else { 
                    alert(`결제 실패: ${response.error_msg}`);              // alert 메소드: '알림창' 표시 -> '결제 실패' 알림창 표시
                }
            }
        );
    }

    // [4-4] 화면 렌더링
    return (
        <div className = "product-purchase_wrapper">
            <ToastContainer/>
            
            <div className = "product-purchase_header">
                <img className = "product-purchase_image" src = "../../image/purchase_icon.png"/>
                <div className = "product-purchase_title">상품 결제</div>
            </div>

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

            <div className = "product-purchase_body">       
                <ProductPurchaseTextArea
                    buyerName = { buyerName }
                    setBuyerName = { setBuyerName }
                    buyerEmail = { buyerEmail }
                    setBuyerEmail = { setBuyerEmail }
                    buyerPhoneNumber = { buyerPhoneNumber }
                    setBuyerPhoneNumber = { setBuyerPhoneNumber }
                    buyerAddress = { buyerAddress }
                    setBuyerAddress = { setBuyerAddress }
                    productCount = { productCount }
                    setProductCount = { setProductCount } 
                    buyerRequest = { buyerRequest }
                    setBuyerRequest = { setBuyerRequest}/> 
            </div>

            <div className = "purchase-button">
                {canSubmit() ? (
                    <Button
                        color = "secondary"
                        variant = "contained"
                        style = {{
                            width: "650px",
                            height: "50px",
                            marginLeft: "25px",
                        }}
                        onClick = { loadPayment }
                    >  
                    결제하기
                    </Button>
                ) : (
                    <Button
                        color = "secondary"
                        variant = "contained"
                        style = {{
                            width: "650px",
                            height: "50px",
                            marginLeft: "25px",
                        }}
                    >  
                    결제하기
                    </Button>
                )}
            </div>
        </div>
    );
}

/* 3. 처리 */
// ProductPurchase 함수 내보내기
export default ProductPurchase;