/* <삼승 CEAS 메인 실행 모듈 설정> */
//  - 설명: 메인 실행 모듈 설정

/* 1. 모듈 추가 */
// 1-1. 'React 관련 라이브러리' 추가
import React from 'react';                                             // react 라이브러리: '메타'에서 개발한 '오픈 소스 자바스크립트 라이브러리'
import ReactDOM from 'react-dom/client';                               // react-dom/client 모듈: '클라이언트'에서 '애플리케이션을 초기화' 할 때 사용할 수 있는 '클라이언트 특화 함수' 제공
                                                                       // - ReactDOM(문서 객체 모델) 컴포넌트: 'ReactDOM' 관련 함수 제공
import { BrowserRouter } from 'react-router-dom';                      // react-router-dom 모듈: '웹'에서의 '라우팅' 
                                                                       // - BrowserRouter 컴포넌트: 'history API'를 이용해 'URL'과 'UI' 동기화
import reportWebVitals from './reportWebVitals';                       // reportWebVitals 컴포넌트: 'React 성능' 측정                                                                  

// 1-2. 'CSS' 모듈 추가
import './index.css';                                                  // index 모듈: '기본 화면' 스타일링

// 1-3. '페이지'를 표시하기 위한 컴포넌트 추가
import App from './App';                                               // App 컴포넌트: '페이지' 관련 기능 구현 + 화면 표시

// 1-4. 'Redux' 관련 컴포넌트 추가
import { Provider } from "react-redux";                                // react-redux 모듈: '컴포넌트의 데이터들'을 'redux store'에서 '상태 관리'
                                                                       // - Provider 컴포넌트: 'React 웹 애플리케이션'에서 'redux'와 'redux-persist'의 'store' 연동
import store from "./redux/configStore";                               // store 컴포넌트: 'storage(rudux 데이터 저장소)' 생성
import { PersistGate } from "redux-persist/integration/react";         // redux-persist/integration/react 모듈: 
                                                                       // - PersistGate 컴포넌트: 'Redux store에 유지시키고자 하는 데이터'들이 정상적으로 저장되고 불러올 수 있도록 'UI 렌더링 지연'
                                                                       //                          '루트 컴포넌트'를 감싸서 사용
import persistStore from "redux-persist/es/persistStore";              // redux-persist/es/persistStore 모듈:
                                                                       // - persistStore 컴포넌트: '정의된 store의 내용'에 따라 'Redux 데이터'를 유지시킬 수 있는 'Redux store' 생성

/* 2. 변수 설정 */
const persistor = persistStore(store)                               // persisitor 변수: persistStore 메소드로 '웹서비스를 종료해도 지속될 store'를 생성하는 기능 저장
const root = ReactDOM.createRoot(document.getElementById('root'));  // root 변수: '렌더 트리'에서 '최상위 레벨'의 포인터

/* 3. 처리 */
// 3-1. 화면 렌더링
root.render(
  <Provider store = { store }> 
    <PersistGate persistor = { persistor }>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// 3-2. 'React 성능' 측정
reportWebVitals(); // reportWebVitals 메소드: 'React 성능' 측정 보고
