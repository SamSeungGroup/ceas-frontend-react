/* <삼승 CEAS 페이지 - 메인> */
//   - 설명: '회원/비회원'이 첫 번째로 맞이하는 페이지

/* 1. 모듈 추가 */
// 1-1. 'SCSS' 모듈 추가
import "./ceo-welcome.scss"; // main.scss 모듈: '메인 페이지' 스타일링

/* 2. 함수 설정 */
// Main 함수: '화면'에 '메인 페이지' 기능 구현 + 화면 표시
const CEOWelcome = () => {
  // [1] 처리
  // [1-1] 화면 렌더링
  return (
    <div className = "ceo-welcome-wrapper">
      <div className = "main-title">
        <span>고객 여러분께 인사드립니다.</span>
      </div>

      <div className = "main-contents">
        '삼승 CEAS'에 방문해 주신 여러분께 진심으로 감사드립니다.<br/> 
        (CEO 인사말 작성 예정)
      </div>

      <div className = "group-informtaion">
        <div className = "group-leader-information">
          - 삼승그룹 <span>대표이사 송정우 드림 - </span>
        </div>
      </div>
    </div>
  )
}

/* 3. 처리 */
// Main 함수 내보내기
export default CEOWelcome;