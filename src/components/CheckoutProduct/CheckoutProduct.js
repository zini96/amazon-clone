import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "../StateProvider/StateProvider";

function CheckoutProduct({ id, image, title, rating, price, hideButton }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    //장바구니 제거 함수 만들기
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="checkoutproduct">
      <img className="check_product_img" src={image} alt="product image" />
      <div className="check_product_info">
        <p className="check_product_title">{title}</p>
        <p className="check_product_price">
          <small>₩ </small>
          <strong>{price}</strong>
        </p>
        <div className="check_product_rating">
          {Array(rating) //rating 안의 크기만큼 array 생성
            .fill()
            .map(() => (
              <p>★</p>
            ))}
        </div>
        {!hideButton && (
          <button className="check_product_btn" onClick={removeFromBasket}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
