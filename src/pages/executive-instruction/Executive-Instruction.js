/* <삼승 CEAS 페이지 - 메인> */
//   - 설명: '회원/비회원'이 첫 번째로 맞이하는 페이지

/* 1. 모듈 추가 */
// 1-1. 'SCSS' 모듈 추가
import "./executive-instruction.scss"; // main.scss 모듈: '메인 페이지' 스타일링

/* 2. 함수 설정 */
// Main 함수: '화면'에 '메인 페이지' 기능 구현 + 화면 표시
const ExecutiveInstruciton = () => {
  // [1] 처리
  // [1-1] 화면 렌더링
  return (
    <div className = "executive-instruction_wrapper">
      <div className = "executive-instruction_title">
        <span>임원진(개발진) 소개</span>
      </div>

      <div className = "executive-instruction_image">

      </div>
    </div>
  )
}

/* 3. 처리 */
// Main 함수 내보내기
export default ExecutiveInstruciton;