import { Checkbox } from "@mui/material";
import React from "react";
import "./Checkout.css";
import Subtotal from "../Subtotal/Subtotal";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { useStateValue } from "../StateProvider/StateProvider";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../reducer";
import { Link } from "react-router-dom";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  const username = (user?.email || "").split("@");

  const titleName = () => {
    if (basket.length == 0) {
      return <h2 className="cart_title">Your Amazon Cart is empty</h2>;
    }
    return (
      <h2 className="cart_title">
        <span className="cart_username">{username[0]}</span>
        {user ? "'s" : ""} Shopping Cart
      </h2>
    );
  };

  const emptyCart = () => {
    if (basket.length == 0) {
      return (
        <div className="emptycart">
          <img
            className="emptycart_img"
            src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg"
            alt="/"
          />
          <div className="emptycart_text">
            <p>Your Amazon Cart is empty</p>
            <Link to="/" className="txt">
              Shop today's deals
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="checkout">
      <div className="checkout_top">
        <img
          className="checkout_ad"
          src="https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/AUX/ILB_BrightColors_NotApproved._TTW_.jpg"
          alt="checkout_ad"
        />
      </div>
      <div className="checkout_main">
        <div className="checkout_left">
          {titleName()}
          {emptyCart()}
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              price={item.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              rating={item.rating}
              image={item.image}
            />
          ))}
          <div className="subtotal_cart">
            <CurrencyFormat
              renderText={(value) => (
                <p>
                  Subtotal ({basket.length} items): <strong> {value} </strong>
                </p>
              )}
              decimalScale={2}
              value={getBasketTotal(basket)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₩ "}
            />
          </div>
        </div>
        <div className="checkout_right">
          <Subtotal />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
