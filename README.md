# 이마트 FE 사전과제 - 김형준
- 배포 주소: https://emart-kimhyeongjun.herokuapp.com/

# 사용 기술
- React 18.2.0
- json-server 0.17.0
- react-router-dom@6 18.2.0
- react swiper 8.3.2
- HTML5
- CSS3
- JavaScript

# 실행 방법
- ```git clone https://github.com/kimhyeongjun95/emart-kimhyeongjun.git```
- ```npm install```
- ```npm install -g json-server```
=> 만약 안된다면: sudo npm install -g json-server

터미널 두 개를 열고

- 첫 번째 터미널에서
```npm run server```
- 두 번째 터미널에서
```npm start```
로 실행하시면 됩니다.


# 구현 사항

- 2022년 8월 29일 금주의 전단상품 화면를 바탕으로 과제를 진행했습니다.
  - <img src="https://user-images.githubusercontent.com/86656921/187228969-a65af6aa-1026-4a99-9951-68ff92ae81e0.png" style="zoom: 60%" />
  <br />

- API 통신을 사용하여 JSON 데이터를 가져와서 화면을 구성해주세요.
  - `json-server` 모듈을 활용하여, 로컬에서 가상 서버를 만들어 api 통신을 할 수 있도록 하였습니다.
- 스크롤을 이용한 리스트 페이징 처리를 해주세요. (10개씩)
  - 메모리 절약을 위해 `IntersectionObserver` API를 활용하여 리스트 페이징 처리를 했습니다.
- 메뉴 좌우 스크롤, 메뉴 클릭 시 데이터 필터링, 클릭된 메뉴 on/off 표시가 될 수 있도록 처리해주세요.
  - `react swiper` 라이브러리 활용하여 구현했습니다.
- 스크롤 다운 메뉴 숨김 / 스크롤 업 메뉴를 표시해주세요.
- 화면 해상도에 따라 리스트 배열을 변경해주세요. (1열 → 2열, 2열 → 3열)
  - `@media`와 `grid` 레이아웃을 통해 화면 해상도에 따른 리스트 배열이 변경되도록 처리하였습니다.