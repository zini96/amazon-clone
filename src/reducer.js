//data layer로 값을 전달하는 행동 자체를 dispatch라고 부름
//reducer는 이런 dispatch에 맞는 state와 action을 실행

export const initialState = {
  //초기값 생성
  basket: [], // 배열로 만들기
  user: null, //앱 전역에서 user에 대한 정보를 이용할 수 있게 user 만들어주기~~
};

// selector
//state에서 필요한 data를 가져오거나 계산을 수행해서 원하는 형태의 data를 가져오는 역할을 하는것

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);
//reduce=>배열의 모든 요소에 대해 지정된 콜백 함수로 호출
//0=처음값, amount=초기값이자 앞으로 축적될 값들이 저장될 인수
//item=현재의 아이템 속성이 들어감 (item.price=장바구니 아이템의 가격)
//배열의 모든 합을 합산

const reducer = (state, action) => {
  //reducer 생성. state-현재상태
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state, //spread syntax - 배열 안에 내용만 가져오기(배열형태x)
        basket: [...state.basket, action.item], //basket에 기존 basket 내용물(..state)과 action에서 가져온 아이템을 새로운 배열로 만들어줌
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        //findIndex로 찾은 위치를 index에 담아주기
        (basketItem) => basketItem.id === action.id //removefrombasket을 실행했을때의 id와 동일한 id의 아이템의 index 위치 찾기
      );
      //* findIndex의 한계
      //findIndex는 가장 먼저 조건을 만족하는 곳의 index를 반환함
      //action.id와 일치하는(조건) item을 하나만 찾음(동일한 id를 가지는 경우 action이 실행된 아이템이 아니라 배열의 앞에 존재하는 동일id의 아이템이 삭제된다)
      //=>  redux이용해서 해결해보기

      let newBasket = [...state.basket]; //새로운 장바구니 만들어주기(기존 바스켓 일단 넣어주기)

      if (index >= 0) {
        //찾은 index가 0보다 크거나 같은경우 = 존재하는 경우
        newBasket.splice(index, 1); //splice=>원본 배열을 바꾸는 메소드
        //arr.splice(n,m): 특정 요소 지우기
        //배열의 n번째 요소부터 m개를 삭제
      } else {
        //찾은 index가 없는경우
        console.warn(
          //warning 출력하기
          `can't remove product(id:${action.id}) as it's not in the basket`
        );
      }
      return {
        //remove case의 최종 리턴값
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user, //dispatch로 받은 action을 user에 넣어주기
      };

    case "ADD_TO_ADDRESS":
      return {
        ...state, //spread syntax - 배열 안에 내용만 가져오기(배열형태x)
        address: action.address,
      };

    default:
      return state;
  }
};

export default reducer;
