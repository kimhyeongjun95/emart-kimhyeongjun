# 이마트 FE 사전과제 - 김형준

### 실행 방법
```

npm install
npm install -g json-server
=> 만약 안된다면: sudo npm install -g json-server

터미널 두 개를 열고

첫 번째 터미널에서
npm run server
두 번째 터미널에서
npm start

로 실행하시면 됩니다.

```

# 구현 사항

- 2022년 8월 29일 금주의 전단상품 화면를 바탕으로 과제를 진행했습니다.
![image](https://user-images.githubusercontent.com/86656921/187228969-a65af6aa-1026-4a99-9951-68ff92ae81e0.png)

- API 통신을 사용하여 JSON 데이터를 가져와서 화면을 구성해주세요.
  - `json-server` 라이브러리를 활용하여, 로컬에서 가상 서버를 만들어 api 통신을 할 수 있도록 하였습니다.
- 스크롤을 이용한 리스트 페이징 처리를 해주세요. (10개씩)
  - 메모리 절약을 위해 `IntersectionObserver` API를 활용하여 리스트 페이징 처리를 했습니다.