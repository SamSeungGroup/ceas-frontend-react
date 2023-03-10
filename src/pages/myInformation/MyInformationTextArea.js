/* <삼승 CEAS 컴포넌트 - 내 정보 작성> */
//   - 설명: '회원'이 '내 정보' 작성 기능

/* 1. 모듈 추가 */
// 1-1. 'SCSS' 모듈 추가
import "./myinformationtextarea.scss";  // myinformationtextarea.scss 모듈: '상품 정보 작성' 컴포넌트 스타일링

/* 2. 함수 설정 */
// TextArea 함수: '상품 이름, 상품 설명' 작성 기능 구현 + 화면 표시
const MyInformationTextArea = ({ setUserName, userName, setUserEmail, userEmail }) => {                                                                                                                       
    // [1] 처리
    // 화면 렌더링
    return (
        <div className = "myinformation-textarea_wrapper">
            <label>* 회원 이름 수정: </label>
                <input
                    onChange = {(e) => {
                        setUserName(e.target.value);
                    }}
                    className = "user-name"
                    placeholder = "이름을 입력하세요."
                    value = { userName }
                />

            <label>* 회원 이메일 수정: </label>
                <input
                    onChange = {(e) => {
                        setUserEmail(e.target.value);
                    }}
                    className = "user-name"
                    placeholder = "이메일을 입력하세요."
                    value = { userEmail }
                />
        </div>
    );
}

/* 3. 처리 */
// MyInformation_TextArea 함수 내보내기
export default MyInformationTextArea;