/* <삼승 CEAS 컴포넌트 - 댓글> */
//   - 설명: '상품 상세 정보' 페이지에서 '댓글'을 화면에 표시

/* 1. 모듈/라이브러리 및 컴포넌트 추가 */
// 1-1. 'React' 라이브러리 + 'use 훅' 컴포넌트 추가
import React, { useCallback, useEffect, useState } from "react";                            // react 라이브러리: '메타'에서 개발한 '오픈 소스 자바스크립트 라이브러리'
                                                                                            // - React 컴포넌트: 'React' 요소 사용
                                                                                            // - useCallback 훅 컴포넌트: '불필요한 컴포넌트 재렌더링 방지'
                                                                                            // - useEffect 훅 컴포넌트: '비동기 통신' 용도
                                                                                            // - useState 훅 컴포넌트: '상태 관리'
import { useSelector } from "react-redux";                                                  // react-redux 모듈: '컴포넌트 바깥'에서 '상태 관리' 
                                                                                            // - useSelector 훅 컴포넌트: '상태 관리' 최적화
import { useLocation, useNavigate } from "react-router-dom";                                // react-router-dom 모듈: '라우팅' 적용 
                                                                                            // - useLocation 컴포넌트: 이용자가 '현재 머물러있는 페이지'에 대한 정보을 알려줌
                                                                                            // - useNavigate 컴포넌트: '페이지 이동'
                                                                                            // - useParams: '현재 URL'에서 '파라미터'를 가져옴

// 1-2. 'Material UI' 컴포넌트 추가
import { Button, Dialog, DialogContent, IconButton, TextField } from "@mui/material";        // Material UI: 'CSS 프레임워크'
                                                                                             // - Button 컴포넌트: 버튼
                                                                                             // - Dialog 컴포넌트:
                                                                                             // - DialogContent 컴포넌트:
                                                                                             // - IconButton 컴포넌트:
                                                                                             // - TextField 컴포넌트:
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";   // DisabledByDefaultOutlinedIcon 컴포넌트:
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";                           // BuildOutlinedIcon 컴포넌트:

// 1-3. 'UI'를 위한 컴포넌트 추가
import { Modal, Input } from "antd";                                                         // antd 모듈: ???
                                                                                             // - Modal 컴포넌트: '모달창'
                                                                                             // - Input 컴포넌트: '입력창'
import { PieChart } from "react-minimal-pie-chart";                                          // react-minimal-pie-chart 모듈: 'React'에서 간단하게 사용하는 '파이(도넛) 차트' 모듈
                                                                                             // - PieChart 컴포넌트: '파이(도넛) 차트' 표시
import { TagCloud } from 'react-tagcloud';                                                   // react-tagcloud 모듈: '태그(워드) 클라우드' 기능 -> '글자'를 '구름' 형태로 표현
                                                                                             // - TagCloud 컴포넌트: '태그(워드) 클라우드' 표시

// 1-4. '비동기 통신'을 위한 라이브러리 및 컴포넌트 추가
import axios from "axios";                                                                   // axios 라이브러리: '비동기 통신' - REST API 호출
import api from "../utils/api";                                                              // api 컴포넌트: '인터셉터' 기능
import { jwtUtils } from "../utils/jwtUtils";                                                // jwtUtils 컴포넌트: 'jwt 토큰'을 이용한 '이용자 계정' 보안

// 1-5. '날짜 표현' 모듈 추가 
import moment from "moment";                                             // moment 컴포넌트: '날짜' 변환

// 1-6. 'SCSS' 모듈 추가
import "./comments.scss";                                                                    // comments 모듈: '댓글' 스타일링

/* 2. 함수 설정 */
// Comments 함수: '댓글' 작성 기능 구현
const Comments = ({ product_id, productPositive}) => { // product_id 매개필드: '상품 아이디에 맞는 댓글'을 추가 및 삭제하기 위한 용도
    // [1] 상태 관리
    // [1-1] '댓글 데이터' 관리
    const [ commentList, setCommentList ] = useState([]);                                      // '댓글 리스트' 상태 관리 -> commenstList 변수: '댓글 리스트' 저장, setCommentList 함수: '댓글 리스트' 조작
    const [ content, setCommentContent ] = useState("");                                       // '댓글 내용' 상태 관리 -> comment_content 변수: '댓글 내용' 저장, setCommentContent 함수: '댓글 내용' 조작
    const [ comment_id, setCommentId ] = useState("");                                         // '댓글 아이디' 상태 관리 -> comment_id 변수: '댓글 아이디' 저장, setCommentId 함수: '댓글 아이디' 조작

    // [1-2] '내 정보 데이터' 관리
    const [ userId, setUserId ] = useState("");                                                // '회원(구매자) 아이디' 상태 관리 -> userId 변수: '회원 아이디' 저장, setUserId 함수: '회원 아이디' 조작
    const [ writer, setWriter] = useState("");

    // [1-3] '상품 긍정도 데이터' 관리
    //const [ productPositive, setProductPositive ] = useState("");                              // '상품 긍정도' 상태 관리 -> productPositive 변수: '상품 긍정도' 저장, setProductPositive 함수: '상품 긍정도' 조작

    // [1-4] '워드 클라우드 데이터' 관리
    const [ wordcloud, setWordCloud ] = useState([]);                                          // '워드 클라우드' 상태 관리 -> wordcloud 변수: '워드 클라우드 배열' 저장, setWordCloud 함수: '워드 클라우드 배열' 조작

    // [1-5] '모달 출력 여부 데이터' 관리
    const [ logindialog_show, setLoginModalShow ] = useState(false);                           // '로그인 다이얼로그' 표시 여부 상태 관리 -> logindialog_show 변수: '로그인 모달창'이 표시되었는지 여부 저장, setLoginDialogShow 함수: '로그인 모달창 표시 여부' 조작
    const [ editcommentmodal_show, setEditCommentModalShow ] = useState(false);                // '댓글 수정 모달창' 표시 여부 상태 관리 -> editcommentmodal_show 변수: '댓글 수정 모달창'이 표시되었는지 여부 저장, setEditCommentModalShow 함수: '댓글 수정 모달창 표시 여부' 조작
    const [ editcommentsucessdialog_show, setEditCommentSucessDialogShow ] = useState(false);  // '댓글 수정 완료 다이얼로그창' 표시 여부 상태 관리 -> editcommentsucessdialog_show 변수: '댓글 수정 완료 다이얼로그창'이 표시되었는지 여부 저장, setEditCommentSucessDialogShow 함수: '댓글 수정 완료 다이얼로그창 표시 여부' 조작
    const [ deletecommentmodal_show, setDeleteCommentModalShow ] = useState(false);            // '댓글 삭제 모달창' 표시 여부 상태 관리 -> deletecommentmodal_show 변수: '댓글 삭제 모달창'이 표시되었는지 여부 저장, setDeleteCommentModalShow 함수: '댓글 삭제 모달창 표시 여부' 조작
    
    // [2] 변수 설정
    const token = useSelector(state => state.Auth.token);  // token 변수: 'redux store'에서 '토큰'을 받아 저장    
    const id = useSelector(state => state.Id.id);          // id 변수: 'redux store'에서 'id'를 받아 저장

    const options = {
        luminosity: 'light',
        hue: 'blue',
    }

    // [3] 함수 설정
    // location 함수: '이용자가 현재 머물러있는 페이지에 대한 정보'를 알려주는 기능 저장 -> 로그인 후 '현재 경로'로 돌아오기 위함
    const location = useLocation();                  
    
    // navigate 함수: '페이지 이동' 기능 저장
    const navigate = useNavigate();                      

    // handleOk 함수: '댓글 수정 완료 모달창'의 'OK 버튼'(승인 버튼)
    const handleOk = async () => {
        setEditCommentSucessDialogShow(true); // '댓글 수정 모달창' 보이기
    }; 

    // handleCancel 함수: '댓글 수정 완료 모달창'의 'Cancel 버튼'(취소 버튼)
    const handleCancel = () => {
        setEditCommentModalShow(false);       // '댓글 수정 모달창' 숨기기
    };

    // submit 함수: '비동기(async)' 함수, '댓글 데이터'를 '서버'에 송신
    const submit = useCallback(async () => {
        // (1) '서버'에 '댓글 내용' 송신
        await api.post(`/products/${product_id}/comments`, {'content': content}, { headers: { "Content-Type": "application/json"}}); // api.post 메소드: '서버'에 '데이터' 송신 -> '댓글 내용 데이터'를 '서버'에 송신
                                                                                                                                     //                  : comment_content

                                                                                                                      
        // (2) '댓글 등록 완료' 알림창 표시
        alert("댓글 등록 완료");   // alert 메소드: '알림창' 표시

        // (3) 페이지 새로고침
        window.location.reload();  // location.reload 메소드: '현재 페이지'를 '새로고침'하여 페이지를 다시 불러옴
    }, [ content ]);

    // goLogin 함수: '로그인 후' 돌아올 수 있게 '현재 경로' 설정
    const goLogin = () => {
        setLoginModalShow(false);                            // '로그인 모달창'을 표시하지 않음
        navigate(`login?redirectUrl=${location.pathname}`);  // '다시 돌아올 현재 경로' 설정
    }
    
    // isLogin 함수: '로그인을 하지 않은 상태'에서 '댓글 입력창'을 클릭하면 '로그인 모달창' 표시
    const isLogin = () => {
        if(jwtUtils.isAuth(token)){
            setLoginModalShow(false);
        }
    }

    // [4] 처리
    // [4-1] '댓글 목록'을 '서버'로부터 수신
    useEffect(() => {
        // try -> 댓글 목록 데이터 수신 성공' 처리
        try{
            // (1) '댓글 목록 데이터'를 '서버'로부터 수신 
            // getCommentList 함수: '비동기(async)' 함수, '댓글 목록 데이터' 저장
            const getCommentList = async () => {
                const { data } = await api.get(`/products/${product_id}/comments`); // axios.get 메소드: '서버'로부터 '데이터' 수신 -> '댓글 목록 데이터' 수신
                                                                                    //                    : comment_id, comment_content, comment_createDate, comment_author, comment_positive, userId
    
                return data;
            }

            // (2) '댓글 목록 데이터'를 'setCommentList 함수'에 설정
            getCommentList().then((response) => {
                setCommentList(response.data);
                setCommentId(response.data[0].id);
                setWriter(response.data[0].writer);
            });
        }

        // catch -> '댓글 정보 데이터 수신 실패' 처리
        catch(e){
            
        }
    },[])

    // [4-2] '내 아이디 데이터'를 '서버'로부터 수신
    useEffect(() => {
        // try -> '내 아이디 데이터 수신 성공' 처리
        try{
            // (1) '내 아이디 데이터'를 '서버'로부터 수신
            // getUser 함수: '비동기(async)' 함수, '내 아이디 데이터' 저장
            const getUser = async () => {
                const { data } = await api.get(`http://localhost:8080/users/${id}`); // axios.get 메소드: '서버 주소'로부터 '데이터' 수신 -> '내 정보 데이터' 수신
                                                                                     //                    : userId

                return data;
            }

            // (2) '내 아이디 데이터'를 'setUserId' 함수에 적용 
            getUser().then((response) => {
                setUserId(response.userId);        // '내 아이디' 설정
            })
        }

        // catch -> '내 아이디 데이터 수신 실패' 처리
        catch(e){
            
        }
    }, []);

    

    // [4-5] 화면 렌더링
    return (
        <div className = "comments-wrapper">
            <div className = "positive-chart_wrapper">
                <PieChart 
                    data = {[                                            // data 속성: '차트'에 표시할 '데이터 정보'
                        {
                           value: (productPositive*100).toFixed(3),      // value 필드: '비율 표시값'
                           color: "blue",                                // color 필드: '비율 표시 색상'
                           name: "상품 긍정도",                          // name 필드: '차트 이름'
                         },
                    ]}
                    style = {{                                           // style 속성: 차트 '스타일'
                        width: "90%"                                     // width 필드: '너비' 설정
                    }}
                    reveal = { productPositive*100 }                     // reveal 속성: '비율 표시'
                    lineWidth ={ 18 }                                    // lineWitdth 속성: '도넛 두께'
                    background = "gray"                                  // background 속성: '비율'이 채워지지 않은 '나머지 부분의 색'
                    lengthAngle = { 360 }                                // lengthAngle 속성: '최대 비율' 표시 -> '원 모양(360)' 표시
                    rounded                                              // rounded 속성: '양 끝 모양'이 '동그랗게' 설정
                    animate                                              // animate 속성: '페이지 입장' 시 '비율 차트'가 채워지는 '애니메이션' 적용
                    label = {({ dataEntry }) => dataEntry.value + '%'}	 // label 속성: '비율 글자 표시' 스타일('가운데에 표시되는 글자')
                    labelStyle = {{                                      // labelStyle 속성: '비율 글자' 스타일
                        fontSize: "20px",                                // fontSize 필드: 비율 글자 '크기'
                        fill: "blue",                                    // fill 필드: 비율 글자 '색상'
                    }} 
                    labelPosition = { 0 }                                // labelPosition 속성: 비율 글자 '위치'
                />
            </div>

            <div className = "wordcloud_wrapper">
                <img src = { `http://localhost:5000/word-cloud/${product_id}` }/>               
            </div>

            <div className = "enquiry_button_wrapper">
                <Button
                    color = "primary"
                    variant = "contained"
                    style = {{
                        textAlign: "center",
                        width: "900px",
                        height: "60px"
                    }}
                    onClick = { () => navigate(`/enquiry-to-seller/${product_id}`)}
                >
                판매자 1:1 문의
                </Button>
            </div>

            <div className = "comments-header">
                <TextField 
                    className = "comments-header_textarea" 
                    maxRows = { 3 } 
                    onClick = { isLogin }
                    onChange = { (e) => { setCommentContent(e.target.value) }} 
                    multiline 
                    placeholder = "댓글을 입력해 주세요."
                />
                
                { content !== "" ? (
                    <Button 
                        variant = "outlined" 
                        onClick = { submit }>
                        등록하기
                    </Button>
                    ) : ( 
                    <Button 
                        variant = "outlined" 
                        disabled = { true }>
                        등록하기
                    </Button>)
                }
            </div>

            <div className = "comments-body">
                { commentList.map((item, index) => (
                    <div key = { index } className = "comments-comment">
                        <div className = "comment-username">{ item.writer.userName }</div>

                        <div className = "comment-user_image">
                            <img src = { `http://localhost:8080/images/user/${item.writer.id}` }/>
                        </div>

                        <div className = "comment-content">{ item.content }</div>

                        <div className = "comment-username_date">
                            <div className = "comment_date">{  moment(item.createdDate).format('YYYY년 MM월 DD일') }</div>
                        </div>

                        {
                            jwtUtils.isAuth(token) && id === item.writer.id &&
                            <div className = "comment-edit-delete_button">
                                <Button
                                    className = "comment-delete_button" 
                                    variant = "outlined" 
                                    color = "error"
                                    style = {{ fontSize: 12 }}
                                    endIcon = { <DeleteForeverOutlinedIcon /> } 
                                    onClick = { () => { setDeleteCommentModalShow(true); } }>
                                   삭제
                                </Button> 

                                <Button
                                    className = "comment-edit_button" 
                                    variant = "outlined" 
                                    style = {{ fontSize: 12 }}
                                    endIcon = { <BuildOutlinedIcon/> } 
                                    onClick = { () => {
                                         setEditCommentModalShow(true); 
                                         setCommentId(item.id);
                                    } }>
                                    수정
                                </Button> 
                            </div>
                        }                  

                        <hr className = "comment_hr"/>
                    </div>
                    
                ))}
            </div>

            <Dialog open = { logindialog_show }>
                <DialogContent style = { { position: "relative" } }>
                    <IconButton style = { { position: "absolute", top: "0", right: "0"}} onClick = { () => { setLoginModalShow(false)}}>
                        <DisabledByDefaultOutlinedIcon />
                    </IconButton>

                    <div className = "modal">
                        <div className = "modtal-title">로그인이 필요합니다.</div>
                        
                        <div className = "modal-content">로그인 페이지로 이동하시겠습니까?</div>
                        
                        <div className = "modal-button">
                            <Button variant = "outlined" color = "error" onClick = { goLogin }>예</Button>
                            
                            <Button variant = "outlined" color = "primary" onClick = {() => { setLoginModalShow(false) }}>아니오</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Modal title = "댓글 수정" visible = { editcommentmodal_show } onOk = { handleOk } onCancel = { handleCancel }>
                <p>회원님의 소중한 댓글은 판매자에게 큰 힘이 됩니다.</p>

                <Input
                    value = { content }
                    onChange = {(e) => {
                        setCommentContent(e.target.value);
                    }}
                />
            </Modal>

            <Dialog open = { editcommentsucessdialog_show }>
                <DialogContent style = { { position: "relative" } }>
                    <IconButton 
                        style = { { position: "absolute", top: "0", right: "0"}} 
                        onClick = { async () => { 
                            setEditCommentModalShow(false);
                            setEditCommentSucessDialogShow(false); 

                            await api.put(`products/${product_id}/comments/${comment_id}`, {'content': content});

                            alert("해당 댓글이 수정되었습니다.");

                            window.location.reload();
                        }}>
                        <DisabledByDefaultOutlinedIcon />
                    </IconButton>
                </DialogContent>
            </Dialog>

            <Dialog open = { deletecommentmodal_show }>
                <DialogContent style = { { position: "relative" } }>
                    <IconButton 
                        style = { { position: "absolute", top: "0", right: "0"}} 
                        onClick = { () => setDeleteCommentModalShow(false) }>
                        <DisabledByDefaultOutlinedIcon/>
                    </IconButton>

                    <div className = "modal">
                        <div className = "modal-title" style = {{ fontSize: "15px"}}>댓글을 삭제하시겠습니까?</div>
                        
                        <div className = "modal-button">
                            <Button 
                                variant = "outlined" 
                                color = "error" 
                                style = {{ fontSize: "15px"}}
                                onClick = { async () => { 
                                    setDeleteCommentModalShow(false);

                                    await api.delete(`/products/${product_id}/comments/${comment_id}`);

                                    alert("해당 댓글이 삭제되었습니다.");

                                    window.location.href = `/productdetail/${product_id}`;
                                }}>
                                 예
                            </Button>

                            <Button 
                                variant = "outlined" 
                                color = "primary" 
                                style = {{ fontSize: "15px"}}
                                onClick = { () => setDeleteCommentModalShow(false) }>
                                아니오
                            </Button>
                        </div>
                    </div>         
                </DialogContent>
            </Dialog>
        </div>
    )
}

/* 3. 처리*/
// Comments 함수 내보내기
export default Comments;