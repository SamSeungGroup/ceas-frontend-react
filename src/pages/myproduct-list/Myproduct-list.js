/* <삼승 CEAS 내 상품 관리 페이지> */
//   - 설명: '이용자'가 '등록한 상품'을 화면에 표시

/* 1. 모듈 및 컴포넌트 추가 */
// 1-1. use 훅 컴포넌트 추가
import { useEffect, useState, useMemo } from "react";                   // react 라이브러리: '메타'에서 개발한 '오픈 소스 자바스크립트 라이브러리' 
                                                                         // - useEffect 훅 컴포넌트: '비동기 통신' 용도 
                                                                         // - useState 훅 컴포넌트: '상태 관리'
                                                                         // - useMemo 훅 컴포넌트: '기능 재사용'
import { useSelector } from "react-redux";                               // react-redux 모듈: '컴포넌트의 데이터들'을 'redux store'에서 '상태 관리' 
                                                                         // - useSelecter 컴포넌트 훅: 'redux store'에 저장된 '상태값'을 찾아 반환

// 1-2. '날짜' 관리를 위한 모듈 추가
import moment from "moment"                                              // moment 모듈: '날짜' 관리

// 1-3. 'UI' 관련 컴포넌트 추가
import { ProductItemCard } from "../../components/ProductItemCard";      // ProductItemCard 컴포넌트: '상품 목록' 페이지에서 '하나의 상품 정보 카드' 표시

// 1-4. '비동기 통신'을 위한 모듈 추가
import api from "../../utils/api";                                       // api 컴포넌트: '비동기 HTTP 통신' 이용 - REST API 호출 + '인터셉터' 기능

// 1-5. 'SCSS' 모듈 추가
import "../product-list/productlist.scss";                               // productlist scss 모듈: '상품 목록' 스타일링

/* 2. 함수 설정 */
// MyProductList 함수: '상품 목록' 기능 구현
const MyProductList = () => {
    // [1] 상태 관리
    // [1-1] '상품 목록 데이터' 관리
    const [ productList, setProductList ] = useState([]);        // '상품 목록' 상태 관리 ->myproduct_list 변수: '상품 리스트' 저장, setMyProductList 함수: '상품 리스트' 조작
    const [ onList, setOnList ] = useState(false);               // '상품 출력 여부' 상태 관리 -> onList 변수: '상품 출력 여부 상태' 저장, setOnList 함수: '상품 출력 여부 상태' 조작

    // [2] 변수 설정
    const id = useSelector(state => state.Id.id);                // id 변수: 'redux store'에서 'userId'를 받아 저장

    // [2] 함수 설정
    
    // [3] 처리
    // [3-1] '상품 목록 데이터'를 '서버'로부터 수신
    useEffect(() => {
        // try -> '상품 목록 데이터 수신 성공' 처리
        try{
            // (1) '상품 목록 데이터'를 '서버'로부터 수신
            // getProductList 함수: '비동기(async)' 함수, '상품 목록 데이터' 저장
            const getProductList = async () => {
                const { data } = await api.get(`/products`);   // data 필드: '상품 목록 데이터' 저장
                                                               // axios.get 메소드: '서버 주소'로부터 '데이터' 수신 -> '상품 목록 데이터' 수신
                                                               //                    : product_id, product_name, product_img, product_img, product_price, product_positive                                                   
    
                return data;
            }

            // (2) '상품 목록 데이터'를 'setProductList 함수'에 설정 + '상품 목록 데이터'가 로드되었다고 설정
            getProductList().then(response => 
                setProductList(response.data)); // '상품 목록' 설정
                setOnList(true);                // '상품 목록 출력' 설정
        }

        // catch -> '상품 목록 데이터 수신 실패' 처리
        catch(e){
            // (1) '상품 목록 데이터'가 로드되지 않았다고 설정
            setOnList(false);               // '상품 목록 미출력' 설정
        }
    }, [])

    // MyProductItems 함수: '내 상품 리스트' 저장
    function MyProductItems(productList, id){        
                           // <매개변수>
                           //   - productList: '상품 목록'
                           //   - userId: '회원 아이디'

        // (1) 변수 설정
        let myProductList = [];                         // myProductList 리스트: '회원 아이디와 일치하는 상품 목록' 저장

        // (2) 처리
        // (2-1) '회원 아이디와 일치하는 상품 목록' 검색
        productList.forEach((p)=>{ 
                            // <매개변수>
                            //  - p: 'product_List'

            // (2-1-1) '회원 아이디'와 일치하는 '상품의 회원 아이디'가 없을 경우
            if(p.seller.id !== id){
                return;                                // 실행 종료
            }

            // (2-1-2) '회원 아이디'와 일치하는 '상품'이 있을 경우
            myProductList.push(p)                      // '검색한 단어'와 일치하는 '상품 이름'을 가진 '상품'을 '검색 상품 목록' 추가
        })

        // (3) 반환
        // (3-1) '회원 아이디와 일치하는 상품 목록' 반환
        return myProductList;
    }

    // myProductlist 리스트: '회원 아이디와 일치하는 상품 목록' 저장
    // useMemo 훅: '기능' 재사용
    const myProductList = useMemo(() =>
        MyProductItems(productList, id), 
    [ productList ]);

    // (2) 화면 렌더링
    return (
        <div className = "product-list_wrapper">
            <div className = "product-list_header">
                <img className = "product-list_image" src = "../../image/myproduct_list_icon.png"/>
                <div className = "product-list-title">내 상품 관리</div>
            </div>

            <div className = "product-list_body" style = {{ marginTop: "50px" }}>
                { onList ? 
                    (myProductList.map((item, index) => (
                        <ProductItemCard
                            key = { index } 
                            productId = { item.id }
                            productImage = { `http://localhost:8080/images/product/${item.id}` }
                            productName = { item.productName }
                            productPrice = { item.productPrice }
                            productPositive = { item.productPositive }
                            userName = { item.seller.userName }
                            productCreateDate = { moment(item.created).format('YYYY년 MM월 DD일') }
                        />
                ))) : (
                    <h2 className = "no-myproduct-list">등록한 상품이 없습니다.</h2>
                )}
            </div>
        </div>
    )
}

/* 3. 처리 */
// ProductList 함수 내보내기
export default MyProductList;