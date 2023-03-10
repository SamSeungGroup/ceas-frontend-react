/* <삼승 CEAS 페이지 - 메인> */
//   - 설명: '회원/비회원'이 '사이트 이용법'을 알 수 있는 페이지

/* 1. 모듈 추가 */
// 1-1. 'SCSS' 모듈 추가
import "./how-to-use.scss"; // how-to-use.scss 모듈: '사이트 이용버' 스타일링

/* 2. 함수 설정 */
// HowToUse 함수: '화면'에 '사이트 이용법'을 화면 표시
const HowToUse = () => {
  // [1] 처리
  // [1-1] 화면 렌더링
  return (
    <div className = "how-to-use_wrapper">
      <div className = "how-to-use-title">
        <span>삼승 CEAS</span> 사이트 이용 방법
      </div>

      <div className = "how-to-use_image">

      </div>

      <div className = "how-to-use_image">

      </div>
      
    </div>
  )
}

/* 3. 처리 */
// Main 함수 내보내기
export default HowToUse;