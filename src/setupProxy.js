/* <CORS 해결> */
//  - 설명: '프록싱'으로 'CORS 정책' 우회, '미들웨어' 설정

/* 1. '변수' 설정 */
const { createProxyMiddleware } = require('http-proxy-middleware') // createProxyMideleware 필드: '프록시 미들웨어' 기능 저장 - require 메소드: '외부 모듈'을 불러옴 -> '프록시 모듈'을 불러옴

/* 2. '처리' */
// '모듈' 내보내기
module.exports = function (app) {        // module.export: 정의된 '모듈'을 내보냄
  // app.use 함수: '미들웨어' 사용
  app.use(
      createProxyMiddleware(' ', {       // path 설정: '접속하려는 서버 주소'의 'path' 설정 
        target: 'http://localhost:8080', // target 필드: '접속하려는 서버'의 '루트 URL'
        changeOrigin: true,              // changeOrigin 필드: '대상 서버의 구성'에 따라 '호스트 헤더의 변경'을 해주는 옵션  
      }),
  );
};