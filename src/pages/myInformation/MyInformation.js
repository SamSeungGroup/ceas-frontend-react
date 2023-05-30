/* <삼승 CEAS 페이지 - 내 정보 관리> */
//   - 설명: '회원'이 '내 정보를 수정'할 수 있는 페이지

/* 1. 모듈 및 컴포넌트 추가 */
// 1-1. 'use 훅 컴포넌트' 추가
import { useNavigate, useParams } from "react-router-dom";                                   // react-router-dom 모듈: '웹'에서의 '라우팅' 
                                                                                             // - useNavigate 훅 컴포넌트: '페이지 이동'
                                                                                             // - useParams 훅 컴포넌트: '쿼리 파라미터' 검색
import { useCallback, useEffect, useState } from "react";                                    // react 라이브러리: '메타'에서 개발한 '오픈 소스 자바스크립트 라이브러리' 
                                                                                             // - useCallback 훅 컴포넌트: '불필요한 컴포넌트 재렌더링 방지' 
                                                                                             // - useEffect 훅 컴포넌트: '비동기 통신' 용도 
                                                                                             // - useState 훅 컴포넌트: '상태 관리'
 
// 1-2. 'UI' 컴포넌트 추가
import { Button, Dialog, DialogContent, IconButton } from "@mui/material";                   // Material UI: 'CSS 프레임워크'
                                                                                             // - Button 컴포넌트: '버튼'
                                                                                             // - Dialog 컴포넌트: '다이얼로그'
                                                                                             // - DialogContent 컴포넌트: '다이얼로그 내부에서의 내용'
                                                                                             // - IconButton 컴포넌트: '아이콘 버튼'워크 - Button 컴포넌트: 버튼
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";   // - DisabledByDefaultOutlinedIcon 컴포넌트: 
import { Input } from "antd";                                                                // antd 모듈: ???
                                                                                             // - Modal 컴포넌트: '모달창'                                                                                             // - Input 컴포넌트: '입력창'

// 1-3. '알림창' 컴포넌트 추가
import { toast, ToastContainer } from "react-toastify";                                      // react-toastify 모듈: '알림창' 표시 
                                                                                             // - toast 컴포넌트: '알림창' 생성
                                                                                             // - ToastContainer 컴포넌트: '알림창' 렌더링
import "react-toastify/dist/ReactToastify.css";                                              // ReactToastify.css 모듈: '알림창' 스타일링
 
// 1-4. 'UI 기능' 컴포넌트 추가
import MyInformationImageUploader from "./MyInformationImageUploader";                       // MyInformationImageUploader 컴포넌트: '상품 이미지 업로드' 기능
import MyInformationTextArea from "./MyInformationTextArea";                                 // MyInformationTextArea 컴포넌트: '상품 이름', '상품 설명' 작성 기능

// 1-5. '비동기 통신'을 위한 모듈 및 컴포넌트 추가
import api from "../../utils/api";                                                           // api 컴포넌트: '인터셉터' 기능 

// 1-6. 'Redux' 사용을 위한 컴포넌트 추가
import { useSelector, useDispatch } from "react-redux";                                       // react-redux 모듈: '컴포넌트의 데이터들'을 'redux store'에서 '상태 관리' 
                                                                                              // - useSelecter 훅 컴포넌트: 'redux store'에 저장된 '상태값'을 찾아 반환
                                                                                              // - useDispatch 훅 컴포넌트: 'redux store'에 '변경된 상태값' 저장
import { setToken } from "../../redux/reducers/AuthReducer";                                  // AuthReducer 모듈: '토큰'을 반환하는 'reducer' 생성 
                                                                                              // - setToken 컴포넌트: '토큰' 설정
import { setId } from "../../redux/reducers/IdReducer";                                       // IdReducer 모듈: 'id(회원 식별 코드)'를 반환하는 'reducer' 생성
                                                                                              // - setId 컴포넌트: 'id(회원 식별 코드)' 설정
import { setUserId } from "../../redux/reducers/UserIdReducer";                               // UserIdReducer 모듈: 'userId(회원 아이디)'를 반환하는 'reducer' 생성
                                                                                              // - setUserId 컴포넌트: 'userId(회원 아이디)' 설정
                                                                                              
// 1-7. 'SCSS' 모듈 추가
import "./myinformation.scss";                                                                // myinformation 모듈: '내 정보 수정' 페이지 스타일링과 같이 적용

/* 2. 함수 설정 */
// MyInformation 함수: '내 정보를 수정' 할 수 있는 기능 구현 + 화면 표시
const MyInformation = () => {
    // [1] 변수 설정
    const { id } = useParams(); // id 필드: '쿼리 파라미터'로 'id'를 받음

    // [2] 상태 관리
    // [2-1] '내 정보 수정 입력 데이터' 관리
    const [ userName, setUserName ] = useState("");                                // '내 이름' 상태 관리 -> userName 변수: '내 이름' 저장, setUserName 함수: '내 이름' 조작
    const [ userEmail, setUserEmail ] = useState("");                              // '내 이메일 주소' 상태 관리 -> userEmail 변수: '내 이메일 주소' 저장, setUserEmail 함수: '내 이메일 주소' 조작
    const [ userImage, setUserImage ] = useState({                                 // '내 프로필 이미지 파일' 상태 관리 -> userImage 변수: '내 이미지 파일' 저장, setUserImage 함수: '내 이미지 파일' 조작
        image_file: "",                                                            //  - image_file 필드: '파일 탐색기'에서 '선택된 파일' 저장
        preview_URL: "../../image/default_image.png"                               //  - preview_URL 필드: '기본 이미지 주소' 저장 
    });
    const [ IMP, setIMP ] = useState("");
    const [ PG, setPG ] = useState("");
    const [ userPassword, setUserPassword ] = useState("");                        // '회원 비밀번호' 상태 관리 -> userPassword 변수: '회원 비밀번호' 저장, setUserPassword 함수: '회원 비밀번호' 조작

    // [2-2] '회원탈퇴 시 입력 데이터' 관리
    const [ inputPassword, setInputPassword ] = useState("");                      // '회원 탈퇴 비밀번호 입력' 상태 관리 -> inputPassword 변수: '입력된 비밀번호' 저장, setInputPassword 함수: '입력된 비밀번호' 조작
    const [ deleteUserModalShow, setDeleteUserModalShow ] = useState(false);       // '회원 탈퇴 모달창 표시' 상태 관리 -> deleteUserModalShow 변수: '모달창이 표시'되었는지 여부 저장, setdeleteUserModalShow 함수: '모달창이 표시'되었는지 여부 조작
    const [ inputPasswordModalShow, setInputPasswordModalShow ] = useState(false); // '비밀번호 입력 모달창 표시' 상태 관리 -> inputPasswordModalShow 변수: '모달창이 표시'되었는지 여부 저장, setInputPasswordModalShow 함수: '모달창이 표시'되었는지 여부 조작
    
    // [3] 함수 설정
    // navigate 함수: '페이지 이동' 기능 저장
    const navigate = useNavigate();  

    // dispatch 함수: 'redux store'에 '변경된 값'을 저장하기 위한 기능 설정
    const dispatch = useDispatch();     

    // [4] 처리
    // [4-1] '내 프로필 이미지 데이터'를 '서버'로부터 수신
    useEffect(() => {
    // try -> '내 프로필 이미지 데이터 수신 성공' 처리
    try{
      // (1) '내 프로필 이미지 데이터'를 '서버'로부터 수신
      // getUser 함수: '비동기(async)' 함수, '회원 정보 데이터' 저장
      const getUser = async () => {
        const { data } = await api.get(`http://localhost:8080/images/user/${id}`); // axios.get 메소드: '서버 주소'로부터 '데이터' 수신 -> '내 프로필 이미지 데이터' 수신: userImage

        return data;
      }

      // (2) '내 정보 데이터 중 내 프로필 이미지'를 'setUserImage' 함수에 설정
      getUser().then((response) => {
          // (2-1) '내 프로필 이미지'에 '설정된 이미지'가 없을 경우
          if(response.status === 400){
            setUserImage({...userImage, preview_URL: "../../image/default_image.png"});            // '기본 이미지'로 표시
          }

          // (2-2) '내 프로필 이미지'에 '설정된 이미지'가 있을 경우
          else{
            setUserImage({...userImage, preview_URL: `http://localhost:8080/images/user/${id}`});  // '설정된 이미지'로 표시
          }
       });
    }

    // catch -> '내 정보 데이터 수신 실패' 처리
    catch(e){

    }
  }, [])

    // [4-2] '내 정보 데이터'를 '서버'로부터 수신
    useEffect(() => {
        // try -> '내 정보 데이터 수신 성공' 처리
        try{
            // (1) '내 정보 데이터'를 '서버'로부터 수신
            // getUser 함수: '비동기(async)' 함수, '회원 정보 데이터' 저장
            const getUser = async () => {
                const { data } = await api.get(`http://localhost:8080/users/${id}`);                 // axios.get 메소드: '서버 주소'로부터 '데이터' 수신 -> '내 정보 데이터' 수신
                                                                                                     //                   : userName, userEmail, userImage, userPassword
    
                return data;
            }

            // (2) '내 정보 데이터'를 'setUserName/setUserEmail/setUserImage/setUserPassword' 함수에 설정
            getUser().then((response) => {
                setUserName(response.data.userName);                                                  // '내 이름' 설정
                setUserEmail(response.data.userEmail);                                                // '내 이메일 주소' 설정
                setIMP(response.data.impId);                                                          // '내 IMP 코드' 설정
                setPG(response.data.pgId);                                                            // '내 PG사 코드' 설정
                // setUserPassword(response.data.userPassword);                                          // '내 비밀번호' 설정
            });
        }

        // catch -> '회원 정보 데이터 수신 실패' 처리
        catch(e){
            
        }
    }, []);

    // [4-2] 함수 재랜더링 관리
    // canSubmit 함수: '내 정보 데이터'를 서버에 '제출'할 수 있는지 검사
    //                 -> '내 정보 데이터' 목록: '내 프로필 이미지, '내 이름', '내 이메일 주소', 'IMP 코드', 'PG사 코드'
    const canSubmit = useCallback(() => {
        return  userImage.image_file !== "" && userName !== "" && userEmail !== "" && IMP !== "" && PG !== ""
    },[ userImage, userName, userEmail, IMP, PG ]);
    
    // handleSubmit 함수: '비동기(async) 함수', '내 정보 데이터'를 '서버'에 송신
    const handleSubmit = useCallback(async () => {
        // try -> '내 정보 수정 성공' 처리
        try {
            // (1) '폼 데이터' 생성
            const formData = new FormData();                                                               // formData 변수: '상품 정보 데이터'를 저장

            // (2) '폼 데이터'에 '내 정보 데이터' 추가
            formData.append("image", userImage.image_file);                                                // append 메소드: '데이터' 추가 -> '회원 이미지' 추가
            formData.append("dto", new Blob([JSON.stringify({                                              // append 메소드: '데이터' 추가 
                'id': id,                                                                                  // -> id 필드: '회원 식별 아이디' 추가
                'userName': userName,                                                                      // -> userName 필드: '회원 이름' 추가
                'userEmail': userEmail,                                                                    // -> userEmail 필드: '회원 이메일' 추가
                'impId': IMP,                                                                              // -> impId 필드: 'IMP 코드' 추가
                'pgId': PG,                                                                                // -> pgId 필드: 'PG사 코드' 추가
            })], { type: "application/json" }));                                                           // -> type 필드: application/json 타입으로 전송
 
            // (3) '내 정보 데이터'를 '서버'에 송신
            await api.put(`/users/${id}`, formData, { headers: { "Content-Type" : "multipart/form-data"}}); // api.post 메소드: '서버 주소'로 '데이터' 송신 -> '내 정보 데이터' 송신

            // (4) '내 정보 수정 완료' 알림창 표시
            alert("회원정보가 수정되었습니다.");                                                           // alert 메소드: '화면 상단'에 '알림창' 표시 

            // (5) '메인 페이지'로 이동 
            window.location.href = "/";                                                                    // location.href 필드: '페이지 이동' -> '메인 페이지'로 이동
        }

        // catch -> '내 정보 수정 실패' 처리
        catch (e) {
            // (1) '서버'로부터 받은 '에러' 알림창 표시
            toast.error("회원정보 수정에 실패하였습니다.", { 
                position: "top-center"                                                                     // position 필드: toast 메시지 '위치' 설정 -> '상단 가운데'로 조정
            });
        }
    },[ canSubmit ]);
    
    // [4-3] 화면 렌더링
    return (
        <div className = "myinformation_wrapper">
            <ToastContainer/>

            <div className = "myinformation_header">
                <img className = "myinformation-edit_image" src = "../../image/myinformation-edit_icon.png"/>
                <div className = "myinformation-edit-title">내 정보 수정</div>
            </div>

            <div className = "myinformation-submit_button">
                {canSubmit() ? (
                    <Button 
                        onClick = { handleSubmit } 
                        className = "myinformation-sucess_button" 
                        variant = "outlined"
                        size = "large">
                        내 정보 수정
                    </Button>
                ) : (
                    <Button 
                        className = "myinformation-disable_button" 
                        variant = "outlined" 
                        disabled = { true }
                        size = "large">
                        모든 정보를 입력해 주세요.
                    </Button>
                )}
            </div>

            <div className = "myinformation_body1">
                <MyInformationImageUploader 
                    setUserImage = { setUserImage } 
                    preview_URL = { userImage.preview_URL } 
                />
            </div>

            <div className = "myinformation_body2">
                <MyInformationTextArea 
                    setUserName = { setUserName }
                    userName = { userName }
                    setUserEmail = { setUserEmail }
                    userEmail = { userEmail }
                    setIMP = { setIMP }
                    IMP = { IMP }
                    setPG = { setPG }
                    PG = { PG }
                /> 
            </div>

            <div className = "myinformation_body3">
                <Button
                    color = "primary"
                    variant = "contained"
                    onClick = { () => { navigate(`/changepassword/${id}`)}}
                >
                비밀번호 변경
                </Button>

                <Button
                    color = "secondary"
                    variant = "contained"
                    onClick = { () => { setDeleteUserModalShow(true); }}
                >
                회원 탈퇴
                </Button>
            </div>

            <div className = "portone-information_wrapper">
                <div className = "portone-information_title">
                    삼승그룹은 포트원과 함께합니다.
                </div>

                <div className = "portone-information_text">
                    &emsp;&ensp;상품 판매, 결제 관리를 위해서는 <br/>
                    &emsp;&ensp;'포트원(PortOne)'과 연동을 해야 <br/>
                    &ensp;&ensp;
                    &ensp;&ensp;
                    &ensp;&ensp;
                    &ensp;&ensp;
                    &ensp;&ensp;
                    합니다.

                    <br/><br/>

                    &emsp;
                    &emsp;
                    &emsp;
                    &emsp;
                    &emsp;[연동 방법]
                    
                    <br/><br/>

                    &emsp;1. 포트원 '회원가입' 후 '로그인'
                    
                    <br/><br/>

                    &emsp;2. '결제 연동' 메뉴 - '테스트 실 연동<br/>
                    &emsp;
                    &nbsp;&emsp;관리' - '결제 대행사 설정 및 추가'<br/>
                    &emsp;&emsp;&nbsp;
                    에서 본인이 원하는 상점을 추가
                    &emsp;&emsp;&ensp;합니다.
                    
                    <br/><br/>

                    &emsp;3. '대표상점'-'내 식별코드/API <br/>
                    &emsp;&emsp;&nbsp;Keys'로 이동하여 '가맹점 
                    &emsp;&emsp;&emsp;
                    &emsp;&emsp;식별코드'를 찾습니다.
                    
                    <br/><br/>

                    &emsp;4. '결제대행사 목록' - '정보 수정' <br/>
                    &emsp;&emsp;&nbsp;로 이동하여 PG 상점 아이디<br/>
                    &emsp;&emsp;&nbsp;PG(PG사 코드)를 찾습니다. 
                    
                    <br/><br/>

                    &emsp;5. 내 정보 수정에 정보를 입력합니다.
                </div>
            </div>

            <Dialog open = { deleteUserModalShow }>
                <DialogContent style = { { position: "relative" } }>
                    <IconButton 
                        style = { { position: "absolute", top: "0", right: "0"}} 
                        onClick = { () => setDeleteUserModalShow(false) }>
                        <DisabledByDefaultOutlinedIcon/>
                    </IconButton>

                    <div className = "modal">
                        <div className = "modal-title">
                            정말 탈퇴하시겠습니까?<br/> 
                            * 탈퇴 시 모든 정보가 삭제됩니다.
                        </div>
                        
                        <div className = "modal-button">
                            <Button 
                                variant = "outlined" 
                                color = "error" 
                                onClick = { async () => { 
                                    setInputPasswordModalShow(true);
                                }}
                            >
                            예
                            </Button>

                            <Button 
                                variant = "outlined" 
                                color = "primary" 
                                onClick = { () => setDeleteUserModalShow(false) }>
                                아니오
                            </Button>
                        </div>
                    </div>         
                </DialogContent>
            </Dialog>

            <Dialog open = { inputPasswordModalShow }>
                <DialogContent style = { { position: "relative" } }>
                    <IconButton 
                        style = { { position: "absolute", top: "0", right: "0"}} 
                        onClick = { () => setInputPasswordModalShow(false) }>
                        <DisabledByDefaultOutlinedIcon/>
                    </IconButton>   
                </DialogContent>

                <p className = "input-password">비밀번호 입력</p>

                <Input
                    value = { userPassword /* inputPassword */ }
                    type = "password" 
                    onChange = {(e) => {
                        setUserPassword(e.target.value);
                    }}
                />

                <div className = "delete-user-modal-button">
                    <Button 
                        variant = "outlined" 
                        color = "error" 
                        style = {{
                            marginTop: "10px",
                            marginLeft: "40px"
                        }}
                        onClick = { async () => { 
                            if(userPassword !== ""){                      
                                await api.delete(`/users/${id}`, { userPassword }).then((response) => {
                                    if(response.code === "SUCCESS"){
                                        alert("회원 탈퇴가 완료되었습니다.");
                                       
                                        dispatch(setToken(""));  
                                        dispatch(setId(""));  
                                        dispatch(setUserId(""));
    
                                        window.location.href = "/";
                                    }

                                    else{
                                        alert("비밀번호를 다시 입력해 주세요.");

                                        setUserPassword("");
                                    }
                                }) 
                            } 

                            else{
                                alert("비밀번호를 입력해 주세요.");
                            } 
                        }}
                    >
                    회원 탈퇴
                    </Button>
                </div>
            </Dialog>
        </div>
    );
}

/* 3. 처리 */
// MyInformation 함수 내보내기
export default MyInformation;