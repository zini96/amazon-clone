import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Payment.css";
import { useStateValue } from "../StateProvider/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { getBasketTotal } from "../../reducer";
import CurrecnyFormat from "react-currency-format";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../firebase & axios/axios";
import { db } from "../firebase & axios/firebase";
import Address from "./Address";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  //보안: 고객 정보가 확인되었을때만 결제되도록 만들기
  const [clientSecret, setClientSecret] = useState("");

  {
    useEffect(() => {
      const getClientSecret = async () => {
        try {
          const items = getBasketTotal(basket);
          const response = await axios.post(
            `/payments/create?total=${getBasketTotal(basket) * 100}`,
            {
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ items }),
            }
          );

          const { clientSecret } = await response.json;

          console.log({ clientSecret });
          console.log(response);
          console.log(response.data);
          console.log(response.data.clientSecret);

          const appearance = {
            theme: "stripe",
          };
          elements = stripe.elements({ appearance, clientSecret });

          const paymentElement = elements.create("payment");

          console.log(paymentElement);
        } catch (error) {
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response.data); //undefined
            console.log(error.response.status); //0
            console.log(error.response.headers); //undifined
          } else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
            // Node.js의 http.ClientRequest 인스턴스입니다.
            console.log(error.request);
          } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log("Error", error.message);
          }
          console.log(error.config);
        }
        setClientSecret(response.data.clientSecret);
      };
      getClientSecret();
      checkStatus();
    }, [basket]);
  }

  console.log("THE SECRET IS >>>", clientSecret);

  const handleSubmit = async (event) => {
    //비동기 syntax 사용해서 결제만들기 -보안때문에 이벤트를 누를때마다 활성화되서 사용할수 있도록
    event.preventDefault();
    setProcessing(true);

    if (elements == null) {
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://clone-81b9a.web.app/orders",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }

    // const payload = await stripe
    //   .createPaymentMethod({
    //     type: "card",
    //     card: elements.getElement(CardElement),
    //   })
    //   .confirmPayment(clientSecret)
    //   .then(({ paymentIntent }) => {
    //     // paymentIntent = payment 확인 및 정보

    //     db.collection("users")
    //       .doc(user?.uid)
    //       .collection("orders")
    //       .doc(paymentIntent.id)
    //       .set({
    //         basket: basket,
    //         amount: paymentIntent.amount,
    //         created: paymentIntent.created,
    //       });

    //     if (payload.error) {
    //       setError(`Payment failed ${payload.error.message}`);
    //       setProcessing(false);
    //     } else {
    //       setError(null);
    //       setProcessing(false);
    //       setSucceeded(true);
    //     }

    //     // 딜레이가 생겻을때 버튼이 비활성화 된다. 하지만 너무 빨리 넘어가서 확인이 불가능

    //     //장바구니가 비었을때 리듀서에 알려주기
    //     dispatch({
    //       type: "EMPTY_BASKET",
    //     });

    //     history.replace("/orders");
    //   });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
    //카드번호 입력 오류시 메세지 출력
  };

  async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

    switch (paymentIntent.status) {
      case "succeeded":
        console.log("Payment succeeded!");
        break;
      case "processing":
        console.log("Your payment is processing.");
        break;
      case "requires_payment_method":
        console.log("Your payment was not successful, please try again.");
        break;
      default:
        console.log("Something went wrong.");
        break;
    }
  }

  return (
    <div className="payment">
      <div className="payment_container">
        <div className="payment_topImg">
          <div className="div1">
            <img
              className="header_logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            />
            <hr id="hr1" />
            <hr id="hr2" />
            <hr id="hr3" />
            <br />
            <ShoppingCartOutlinedIcon id="icon4" />
          </div>
          <div className="div2">
            <p>SIGN IN</p>
            <p>SHIPPING & PAYMENT</p>
            <p>PLACE ORDER</p>
          </div>
        </div>

        <Link to="/checkout">
          <button className="payment_backbtn">
            <span>Back to cart</span>
            <br />({basket?.length} items already in there.)
          </button>
        </Link>

        {/* <div className="payment_section" id="add_select">
          <div className="payment_title">
            <h3>Select a shipping address</h3>
          </div>
          <Address />
        </div> */}

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment List</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                rating={item.rating}
                image={item.image}
              />
            ))}
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment method</h3>
          </div>
          <div className="payment_details">
            {/* 결제 */}
            <form onSubmit={handleSubmit} className="payment-form">
              <CardElement onChange={handleChange} />
              <div className="payment_total">
                {/* 카드번호 입력하기 */}
                <CurrecnyFormat
                  className="payment_total_currency"
                  renderText={(value) => <h3>Total: {value}원</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₩ "}
                />

                <button
                  disabled={
                    processing || disabled || succeeded || clientSecret === null
                  }
                >
                  <span>{processing ? <p>Processing...</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* Show any error that happens when processing the payment */}
              {error && (
                <div className="card-error" role="alert">
                  {error}
                </div>
              )}
              {/* Show a success message upon completion */}
              <p
                className={
                  succeeded ? "result-message" : "result-message hidden"
                }
              >
                Payment succeeded!
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
