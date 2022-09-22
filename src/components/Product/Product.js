import React from "react";
import "./Product.css";
import { useStateValue } from "../StateProvider/StateProvider"; //data layer와의 정보전달이 가능

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  //basket의 정보를 가져오고 dispatch(action)는 리듀서로 전달
  const addToBasket = () => {
    // dispatch the item to data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  // console.log("장바구니 확인", basket);

  return (
    <div className="product">
      <img className="product_img" src={image} alt="product1" />
      <div className="product_info">
        <p className="product_name">{title}</p>
        <div className="product_rating">
          {Array(rating) //rating 안의 크기만큼 array 생성
            .fill()
            .map(() => (
              <p>★</p>
            ))}
        </div>
        <p className="product_price">
          <small>가격 </small>
          <strong>
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </strong>
          <small> 원</small>
        </p>
      </div>
      <button onClick={addToBasket}>Add to Cart</button>
    </div>
  );
}

export default Product;
