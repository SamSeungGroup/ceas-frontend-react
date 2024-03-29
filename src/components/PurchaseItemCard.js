/* <삼승 CEAS 컴포넌트 - 상품 카드 > */
//   - 설명: '상품 목록' 페이지에서 '하나의 상품 정보 카드' 표시

/* 1. 모듈 및 컴포넌트 추가 */
// 1-1. 'use 훅 컴포넌트' 추가
import { useNavigate } from "react-router-dom";             // react-router-dom 모듈: 라우팅 적용 
                                                            // - useNavigate 컴포넌트 훅: '페이지 이동'

// 1-2. SCSS 모듈 추가
import "./purchaseitemcard.scss";                           // purchaseitemcard.scss 모듈: '내 결제 정보' 스타일링

/* 2. 함수 설정 + 처리 */
// ProductInformation 함수: '하나의 상품 정보' 표시
export const PurchaseItemCard = ({ productId, productImage, productName, productPrice, productPositive, userName, productCreateDate }) => {
    // [1] 함수 설정
    // navigate 함수: '페이지 이동' 기능 저장
    const navigate = useNavigate(); 

    // [2] 처리
    // [2-1] 화면 렌더링
    return (
        <div className = "purchase-item-card_wrapper" onClick = { () => navigate(`/productdetail/${productId}`)}>
            <div className = "purchase-item-card-body_img">
                <img src = { productImage }/>
            </div>

            <div className = "purchase-item-card-body_text">
                <div className = "purchase-item-card-body_text_name">
                    { productName }
                </div>

                <div className = "purchase-item-card-body_text_price">
                    - 가격: { productPrice }원
                </div>

                <div className = "purchase-item-card-body_text_positive">
                    - 긍정도: { productPositive }%
                </div>

                <div className = "userName">
                    - 판매자: { userName }
                </div>

                <div className = "userName">
                    - 등록일: { productCreateDate }
                </div>
            </div>
        </div>
    )
}
