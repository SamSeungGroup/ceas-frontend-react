/* <삼승 CEAS 컴포넌트 - 이미지 업로드> */
//   - 설명: '회원'이 '상품 이미지 업로드' 기능 

/* 1. 모듈 추가 */
// 1-1. 'SCSS' 모듈 추가 
import "./imageuploader.scss";           // imageUploader.scss 모듈: '이미지 업로드' 기능 스타일

// 1-2. 'UI'를 위한 컴포넌트 추가
import { Button } from "@mui/material";  // Material UI: CSS 프레임워크 
                                         // - Button 컴포넌트: '버튼' UI

/* 2. 함수 설정 */
// ImageUploader 함수: '상품 이미지'를 업로드할 수 있는 기능 구현 + 화면 표시
const ImageUploader = ({ preview_URL, setProductImage }) => {                                                                 
    // [1] 변수 설정
    let inputRef; // inputRef 변수: '입력값' 참조

    // [2] 함수 설정
    // saveImage 함수: '파일 탐색기'에서 불러온 '이미지 저장'
    const saveImage = (e) => {                              // e 매개변수: '이벤트'를 받음
        // (1) '이벤트 발생'에 의한 '브라우저의 기본 동작' 방지  
        e.preventDefault();                                 // preventDefault 메소드: '브라우저의 기본 동작' 방지

        // (2) '파일 읽기' 객체 생성
        const fileReader = new FileReader();                // fileReader 변수: '파일을 읽는 객체' 생성

        // (3) '파일'이 선택되었을 경우, '선택된 파일'을 읽어옴
        if (e.target.files[0]) {                            // e.target 매개변수: '이벤트'가 발생한 '대상 객체'
                                                            // .files[0] 매개변수: '파일'을 저장할 '배열'
            fileReader.readAsDataURL(e.target.files[0]);    // readAsDataURL 메소드: '컨텐츠'를 특정 'File' 또는 'Blob'에서 읽어옴
        }

        // (4) '파일 업로드'
        // onload 메소드: '파일 읽기' 핸들러, '읽기 동작'이 성공적으로 완료되었을 때마다 발생
        fileReader.onload = () => {
            // setProductImage 함수: '이미지 설정'
            setProductImage({
                image_file: e.target.files[0],              // image_file 필드:  '파일 탐색기'에서 '선택된 파일' 저장
                preview_URL: fileReader.result,             // preview_URL 필드:  '디폴트 이미지 주소' 저장
        });
        };
    };

  // [3] 처리
  return (
    <div className = "uploader_wrapper">
        <input 
            type = "file" 
            accept = "image/*" 
            onChange = { saveImage } 
            ref = { (refParam) => (inputRef = refParam) } 
            style = {{ display: "none" }}/>
      
        <div className = "img_wrapper">
            <img src = { preview_URL } />
        </div>
        
        <div className = "upload_button">
            <Button 
                variant = "outlined" 
                color = "primary" 
                onClick = { () => inputRef.click() }>
                사진 선택
            </Button>
        </div>
    </div>
  );
};

/* 3. 처리 */
// ImageUploader 함수 내보내기
export default ImageUploader;