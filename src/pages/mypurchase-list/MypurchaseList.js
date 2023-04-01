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

// 1-2. '비동기 통신'을 위한 모듈 추가
import api from "../../utils/api";                                       // api 컴포넌트: '비동기 HTTP 통신' 이용 - REST API 호출 + '인터셉터' 기능

// 1-3. '날짜 표현' 모듈 추가 
import moment from "moment";                                             // moment 컴포넌트: '날짜' 변환

// 1-4. 'SCSS' 모듈 추가
import "./mypurchaselist.scss";                                          // mypurchaselist.scss 모듈: '내 결제 관리' 스타일링

/* 2. 함수 설정 */
// MyPurchaseList 함수: '내 결제 내역' 기능 구현
const MyPurchaseList = () => {
    // [1] 상태 관리
    // [1-1] '내 결제 내역 데이터' 관리
    const [ purchaseList, setMyPurchaseList ] = useState([]);    // '내 결제 내역' 상태 관리 -> purchaselist 변수: '내 결제 내역' 저장, setMyPurchaseList 함수: '내 결제 내역' 조작
    const [ onList, setOnList ] = useState(false);               // '내 결제 내역 출력 여부' 상태 관리 -> onList 변수: '내 결제 내역 출력 여부 상태' 저장, setOnList 함수: '내 결제 내역 출력 여부 상태' 조작

    // [2] 변수 설정
    const id = useSelector(state => state.Id.id);                // userId 변수: 'redux store'에서 'userId'를 받아 저장
    
    // [3] 처리
    // [3-1] '내 결제 내역 데이터'를 '서버'로부터 수신
    useEffect(() => {
        // try -> '내 결제 내역 데이터 수신 성공' 처리
        try{
            // (1) '내 결제 내역 데이터'를 '서버'로부터 수신
            // getMyPurchaseList 함수: '비동기(async)' 함수, '내 결제 내역 데이터' 저장
            const getMyPurchaseList = async () => {
                const { data } = await api.get(`/payments/users/${id}`);  // data 필드: '내 결제 내역 데이터' 저장
                                                                          // api.get 메소드: '서버 주소'로부터 '데이터' 수신 -> '내 결제 내역 데이터' 수신                                  
    
                return data;
            }

            // (2) '내 결제 내역 데이터'를 'setMyPurchaseList 함수'에 설정 + '내 결제 내역 데이터'가 로드되었다고 설정
            getMyPurchaseList().then(response => 
                setMyPurchaseList(response.data)); // '내 결제 내역' 설정
                setOnList(true);                   // '내 결제 내역 출력' 설정
        }

        // catch -> '내 결제 내역 데이터 수신 실패' 처리
        catch(e){
            // (1) '내 결제 내역 데이터'가 로드되지 않았다고 설정
            setOnList(false);                   // '내 결제 내역 미출력' 설정
        }
    }, [])

    // [3-2] 화면 렌더링
    return (
        <div className = "mypurchase-list_wrapper">
            <div className = "mypurchase-list_header">
                <img className = "mypurchase-list_image" src = "../../image/purchase_icon.png"/>
                <div className = "mypurchase-list-title">내 결제 내역</div>
            </div>

            <div className = "mypurchase-list_body" style = {{ marginTop: "50px" }}>
                <table>
                        <thead>
                            <tr>
                                <th>주문 번호</th>
                                <th>상품명</th>
                                <th>판매자</th>
                                <th>결제 금액</th>
                                <th>결제 시간</th>
                            </tr>
                        </thead>
                { onList ? (purchaseList.map((item, index) => (
                        <tr>
                            <td>{ item.merchantUid }</td>
                            <td>{ item.productName }</td>
                            <td>{ item.sellerName }</td>
                            <td>{ item.paidAmount }원</td>
                            <td>{ moment(item.paidDate).format('YYYY년 MM월 DD일 hh시 mm분 ss초') }</td>
                        </tr>
                ))) : (
                    <h2 className = "no-mypurchase-list">등록한 상품이 없습니다.</h2>
                )}
                </table>
            </div>
        </div>
    )
}

/* 3. 처리 */
// MyPurcbaseList 함수 내보내기
export default MyPurchaseList;