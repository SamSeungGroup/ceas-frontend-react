/* <삼승 CEAS 컴포넌트 - 상품 정보 작성> */
//   - 설명: '회원'이 '상품 이름, 상품 설명' 작성 기능

/* 1. 모듈 추가 */
// 1-1. 'SCSS' 모듈 추가
import "./textarea.scss";  // textarea.scss 모듈: '상품 정보 작성' 컴포넌트 스타일링

/* 2. 함수 설정 */
// TextArea 함수: '상품 이름, 상품 설명' 작성 기능 구현 + 화면 표시
const TextArea = ({ setProductName, setProductPrice, setProductDescription, product_name, product_price, product_description }) => {                                                                                                                       
    // [1] 처리
    // 화면 렌더링
    return (
        <div className = "textarea_wrapper">
            <label>* 상품 이름: </label>
            <input
                onChange = {(e) => {
                    setProductName(e.target.value);
                }}
                className = "product-name"
                placeholder = "상품 이름을 입력하세요."
                value = { product_name }
            />

            <label>* 상품 가격: </label>
            <input
                onChange = {(e) => {
                    setProductPrice(e.target.value);
                }}
                className = "product-price"
                placeholder = "상품 가격을 입력하세요."
                value = { product_price }
            />
            
            <label>* 상품 설명: </label>
            <textarea
                onChange = {(e) => {
                    setProductDescription(e.target.value);
                }}
                className = "product-description"
                placeholder = "상품 설명을 입력하세요."
                value = { product_description }
            />
        </div>
    );
}

/* 3. 처리 */
// TextArea 함수 내보내기
export default TextArea;