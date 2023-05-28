/* <삼승 CEAS 컴포넌트 - 상품 정보 작성> */
//   - 설명: '회원'이 '상품 이름, 상품 설명' 작성 기능

/* 1. 모듈 추가 */
// 1-1. 'SCSS' 모듈 추가
import "./productpurchasetextarea.scss";  // textarea.scss 모듈: '상품 정보 작성' 컴포넌트 스타일링

/* 2. 함수 설정 */
// TextArea 함수: '상품 이름, 상품 설명' 작성 기능 구현 + 화면 표시
const TextArea = ({ buyerName, setBuyerName, buyerEmail, setBuyerEmail, buyerPhoneNumber, setBuyerPhoneNumber,
                    buyerAddress, setBuyerAddress, productCount, setProductCount, buyerRequest, setBuyerRequest }) => {                                                                                                                       
    // [1] 처리
    // 화면 렌더링
    return (
        <div className = "purchase-textarea_wrapper">
            <label>* 이름:  
                <input 
                    onChange = {(e) => {
                        setBuyerName(e.target.value);
                    }}
                    className = "buyer-name"
                    placeholder = "구매자 이름을 입력하세요."
                    value = { buyerName }
                />
            </label>

            <label>* 이메일 주소:  
                <input
                    onChange = {(e) => {
                        setBuyerEmail(e.target.value);
                    }}
                    className = "buyer-email"
                    placeholder = "구매자 이메일 주소를 입력하세요."
                    value = { buyerEmail }
                />
            </label>
            
            <label>* 전화번호:  
                <input
                    onChange = {(e) => {
                        setBuyerPhoneNumber(e.target.value);
                    }}
                    className = "buyer-phone-number"
                    placeholder = "구매자 전화번호를 입력하세요."
                    value = { buyerPhoneNumber }
                />
            </label>

            <label>* 주소:  
                <input
                    onChange = {(e) => {
                        setBuyerAddress(e.target.value);
                    }}
                    className = "buyer-address"
                    placeholder = "주문을 받을 주소를 입력하세요."
                    value = { buyerAddress }
                />
            </label>

            <label>* 수량:  
                <input
                    onChange = {(e) => {
                        setProductCount(e.target.value);
                    }}
                    className = "product-count"
                    placeholder = "구매 수량을 입력하세요."
                    value = { productCount }
                />
            </label>

            <label>* 요청사항:  
                <input
                    onChange = {(e) => {
                        setBuyerRequest(e.target.value);
                    }}
                    className = "buyer-request"
                    placeholder = "요청사항을 입력하세요."
                    value = { buyerRequest }
                />
            </label>
        </div>
    );
}

/* 3. 처리 */
// TextArea 함수 내보내기
export default TextArea;