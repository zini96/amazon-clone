import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Checkout from "./components/Checkout/Checkout";
import Payment from "./components/Payment/Payment";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Login from "./components/Login/Login";
import Orders from "./components/Order/Orders";
import { useEffect } from "react";
import { auth } from "./components/firebase & axios/firebase";
import { useStateValue } from "./components/StateProvider/StateProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js/pure";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51L822kB1KzVRCXLozmmyYSzcLLn5gf0uU0nLBYXYwWPM86UB0l5F5yXfMbwshYHuExeaYJXnW9EkmE5hYWgLTFnY00biNeZbqR"
);

function App() {
  const [{}, dispatch] = useStateValue();

  const options = {
    clientSecret: "{{${id}_secret_${secret}}}",
  };

  useEffect(() => {
    //동기화(user의 행동(login/logout)을 기억해두는 개념?)
    auth.onAuthStateChanged((authUser) => {
      //로그인한 사용자에 변화가 생기는지 감지
      // console.log(authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []); //[]=>deps, 설정 안하면 렌더링이 무한하게 이어져서 대괄호 넣어주기

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={[<Header />, <Home />, <Footer />]} />

          <Route
            path="/checkout"
            element={[<Header />, <Checkout />, <Footer />]}
          />

          <Route path="/login" element={<Login />} />

          <Route
            path="/payment"
            element={[
              <Header />,
              <Elements stripe={promise} options={options}>
                <Payment />
              </Elements>,
              <Footer />,
            ]}
          />

          <Route
            path="/orders"
            element={[<Header />, <Orders />, <Footer />]}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
