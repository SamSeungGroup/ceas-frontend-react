/* <삼승 CEAS 페이지 - 메인> */
//   - 설명: '회원/비회원'이 첫 번째로 맞이하는 페이지

/* 1. 모듈 추가 */
// 1-1. 'SCSS' 모듈 추가
import "./main.scss"; // main.scss 모듈: '메인 페이지' 스타일링

/* 2. 함수 설정 */
// Main 함수: '화면'에 '메인 페이지' 기능 구현 + 화면 표시
const Main = () => {
  // [1] 처리
  // [1-1] 화면 렌더링
  return (
    <div className = "main-wrapper">
      <div className = "main-title">
        <span>삼승 CEAS</span> 방문을 환영합니다.
      </div>

      <div className = "main_image">
         <img src = "../../image/positive_image.png"/>
      </div>

      <div className = "main-contents">
        상품을 등록해보시고
        <br/>
        고객의 리뷰를 통해 긍정도를 확인해보세요.
      </div>

      <div className = "group-informtaion">
        <div className = "group-leader-information">
          삼승그룹
        </div>
      </div>
    </div>
  )
}

/* 3. 처리 */
// Main 함수 내보내기
export default Main;