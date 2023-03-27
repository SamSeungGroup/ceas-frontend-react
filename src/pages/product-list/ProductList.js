/* <삼승 CEAS 페이지 - 상품 목록> */
//   - 설명: '상품 목록'을 화면에 표시

/* 1. 모듈 및 컴포넌트 추가 */
// 1-1. 'use 훅' 컴포넌트 추가
import { useEffect, useState, useCallback, useMemo } from "react";      // react 라이브러리: '메타'에서 개발한 '오픈 소스 자바스크립트 라이브러리' 
                                                                        // - useEffect 훅 컴포넌트: '비동기 통신'
                                                                        // - useState 훅 컴포넌트: '상태 관리'
                                                                        // - useMemo 훅 컴포넌트: '기능 재사용'
import { useSearchParams } from "react-router-dom";                     // react-router-dom 모듈: '라우팅' 적용 
                                                                        // - useSeacrhParams 훅 컴포넌트: '현재 URL'에서 '쿼리 파라미터' 검색
import { useSelector } from "react-redux";                              // react-redux 모듈: '컴포넌트 바깥'에서 '상태 관리' 
                                                                        // - useSelector 훅 컴포넌트: 'redux store'에 저장된 '상태값'을 찾아 반환

// 1-2. 'UI' 컴포넌트 추가
import { Pagination } from "@mui/material";                             // Material UI: CSS 프레임워크
                                                                        // - Pagination 컴포넌트: '페이지 목록 이동'
import { ProductItemCard } from "../../components/ProductItemCard";     // ProductItemCard 컴포넌트: '상품 목록' 페이지에서 '하나의 상품 정보 카드' 표시

// 1-3. 'Material UI' 컴포넌트 추가
import { Button, TextField } from "@mui/material";                      // Material UI: 'CSS 프레임워크'
                                                                        // - Button 컴포넌트: '버튼'
                                                                        // - TextField 컴포넌트: '텍스트 입력창'

// 1-4. '비동기 통신'을 위한 모듈 추가
import axios from "axios";                                               // axios 모듈: '비동기 HTTP 통신' 이용 -> REST API 호출
import api from "../../utils/api";                                       // api 컴포넌트: '비동기 HTTP 통신' 이용 - REST API 호출 + '인터셉터' 기능 

// 1-5. '날짜 표현' 모듈 추가 
import moment from "moment";                                             // moment 컴포넌트: '날짜' 변환

// 1-6. 'SCSS' 모듈 추가
import "./productlist.scss";                                             // productlist scss 모듈: '상품 목록' 스타일링

/* 2. 함수 설정 */
// ProductList 함수: '상품 목록' 기능 구현 + 화면 표시
const ProductList = () => {
    // [1] 변수 설정
    const id = useSelector(state => state.Id.id);                    // id 변수: 'redux store'에서 'id'를 받아 저장

    // [2] 상태 관리
    // [2-1] '상품 목록 데이터' 관리
    const [ productList, setProductList ] = useState([]);            // '상품 목록' 상태 관리 -> productList 변수: '상품 목록' 저장, setProductList 함수: '상품 목록' 조작
    const [ onList, setOnList ] = useState(false);                   // '상품 출력 여부' 상태 관리 -> onList 변수: '상품 출력 여부 상태' 저장, setOnList 함수: '상품 출력 여부 상태' 조작

    // [2-2] '검색 상품 데이터' 관리
    const [ searchWord, setSearchWord ] = useState("");              // '검색 단어' 상태 관리 -> searchWord 변수: '검색한 단어' 저장, setSearchWord 함수: '검색한 상품 단어' 조작

    // [2-3] '상품 목록 페이지 데이터' 관리
    const [ pageCount, setPageCount ] = useState(0);                 // '페이지 개수' 상태 관리 -> pageCount 변수: '페이지 개수' 저장, setPageCount 함수: '페이지 개수' 조작

    // [2] 함수 설정
    // searchProductItems 함수: '검색한 상품 리스트' 반환
    function searchProductItems(productList, searchWord){        
                                // <매개변수>
                                //   - productList: '상품 목록'
                                //   - searchWord: '검색 단어'

        // (1) 변수 설정
        let searchProductList = [];                      // searchProductList 배열: '검색한 상품 목록' 저장

        // (2) 처리
        // (2-1) '검색한 상품 목록' 검색
        productList.forEach((p) => { 
                             // <매개변수>
                             //  - p: 'productList'
            // (2-1-1) '검색한 단어'와 일치하는 '상품'이 없을 경우
            if(p.productName.indexOf(searchWord) === -1){
                return;                                  // 실행 종료
            }

            // (2-1-2) '검색한 단어'와 일치하는 '상품'이 있을 경우
            searchProductList.push(p)                    // '검색한 단어'와 일치하는 '상품 이름'을 가진 '상품'을 '검색 상품 목록' 추가
        })

        // (3) 반환
        // (3-1) '검색 상품 목록' 반환
        return searchProductList;
    }

    // searchProductlist 배열: '검색 상품 목록' 저장
    // useMemo 훅: '기능' 재사용
    const searchProductList = useMemo(() =>
        searchProductItems(productList, searchWord), 
    [ productList, searchWord ]);
    
    // HotProductItems 함수: '내 상품 리스트' 저장 후 '긍정도'가 높은 '3개의 상품 리스트' 반환
    function HotProductItems(productList){        
                             // <매개변수>
                             //   - productList: '상품 목록'

        // (1) 변수 설정
        let tempProductList = [];   // tempProductList 배열: '임시 저장 배열'
        let hotProductList = [];    // hotProductList 배열: '긍정도'가 높은 '3개의 상품 리스트' 저장

        // (2) 처리
        // (2-1) '상품 목록'을 '임시 저장 배열'에 저장
        productList.forEach((p)=>{ 
                            // <매개변수>
                            //  - p: 'productList'

            // (2-1-1) '회원 아이디'와 일치하는 '상품'이 있을 경우
            tempProductList.push(p); // '검색한 단어'와 일치하는 '상품 이름'을 가진 '상품'을 '검색 상품 목록' 추가
        })

        // (2-2) '임시 저장 배열'에 저장된 '상품 목록'을 '긍정도'가 가장 높은 순서대로 '내림차순 정렬'
        tempProductList.sort((x, y) => x.productName.localeCompare(y.productName))

        // (2-3) '정렬된 임시 저장 배열'에서 '3개의 긍정 상품' 저장
        for(let i = 0; i < tempProductList.length; i++){
            // (2-3-1) '3번째 요소'까지 반복
            if(i === 3){
                break;
            }

            // (2-3-2) '긍정도가 높은 3개의 상품 목록' 저장
            hotProductList[i] = tempProductList[i];
        }

        // (3) 반환
        // (3-1) '긍정도'가 높은 '3개의 상품 목록' 반환
        return hotProductList;
    }

    // hotProductlist 배열: '긍정도'가 높은 '3개의 상품 목록' 저장
    // useMemo 훅: '기능' 재사용
    const hotProductList = useMemo(() =>
        HotProductItems(productList), 
    [ productList ]);

    // [3] 처리
    // [3-1] '상품 목록 데이터'를 '서버'로부터 수신
    useEffect(() => {
        // try -> '상품 목록 데이터 수신 성공' 처리
        try{
            // (1) '상품 목록 데이터'를 '서버'로부터 수신
            // getProductList 함수: '비동기(async)' 함수, '상품 목록 데이터' 저장
            const getProductList = async () => {
                const { data } = await api.get("/products"); // data 객체: '상품 목록 데이터' 저장
                                                             // axios.get 메소드: '서버 주소'로부터 '데이터' 수신 -> '상품 목록 데이터' 수신
                                                             //                    : product_id, product_name, product_img, product_img, product_price, product_positive                                                   
                                                    
                return data;
            }
            
            // (2) '상품 목록 데이터'를 'setProductList 함수'에 설정
            getProductList().then((response) => {
                setProductList(response.data);
            }) 

            // (3) '상품 목록 데이터'가 로드되었다고 설정
            setOnList(true);
        }

        // catch -> '상품 목록 데이터 수신 실패' 처리
        catch(e){
            // (1) '상품 목록 데이터'가 로드되지 않았다고 설정
            setOnList(false);            
        }
    }, []);

    // [3-2] 화면 렌더링
    return (
        <div className = "product-list_wrapper">
            <div className = "product-list_header">
                <img className = "product-list_image" src = "../../image/product_list_icon.png"/>
                <div className = "product-list-title">상품 목록</div>
            </div>

            <div className = "hot-product-list-instruction">
                <img className = "hot-product_image" src = "../../image/hot-product_icon.png"/>
                <h2 className = "hot-product-list-title">Top3 긍정 상품</h2>
            </div>

            <div className = "hot-product-list_body">
                {
                    onList ? (hotProductList.map((item, index) => (
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
                    <h2 className = "no-hot-product-list">등록된 인기 상품이 없습니다.</h2>
                )}
            </div>

            <div className = "search-product_wrapper">
                <TextField 
                    className = "search-product_textarea" 
                    value = { searchWord }
                    maxRows = { 3 } 
                    placeholder = "상품 이름을 입력해 주세요."
                    onChange = { (e) => { setSearchWord(e.target.value); }}
                />

                <div className = "search-button_image">
                    <img src = "../../image/search_product_icon.png"/>
                </div>
            </div>

            <div className = "product-list-instruction">
                <img className = "product_image" src = "../../image/product-list-02_icon.png"/>
                <h2 className = "product-list-title">상품 목록</h2>
            </div>

            <div className = "product-list_body">
                {
                    onList ? (searchProductList.map((item, index) => (
                        <ProductItemCard
                            key = { index } 
                            productId = { item.id }
                            productImage = { `http://localhost:8080/images/product/${item.id}` }
                            productName = { item.productName }
                            productPrice = { item.productPrice }
                            productPositive = { item.productPositive }
                            userName = { item.seller.userName }
                            productCreateDate = { moment(item.created).format('YYYY년 MM월 DD일')}
                        />
                        ))) : (
                            <h2 className = "no-product-list">등록된 상품이 없습니다.</h2>
                        )
                }
            </div>

            <div className = "product-list_footer">
            
            </div>
        </div>
    )
}

/* 3. 처리 */
// ProductList 함수 내보내기
export default ProductList;