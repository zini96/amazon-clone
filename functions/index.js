const functions = require("firebase-functions");
const express = require("express"); //require=>외부 모듈 가져오기("경로")
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51L822kB1KzVRCXLoNQr7ifpPXkAsQN96LzLavAnZpFyntnXu6TMOSvFLlrZyeOb0UN4yPC8gTvma5NQVecC1jjmh00g2QoCiyN"
  //stripe secret key
);

// Stripe.apiKey = "sk_test_4eC39HqLyjWDarjtT1zdp7dc";
//서버 환경 구축하기
//node.js express 기반으로 구축
const app = express();

// app.use(cors({ credentials: true, origin: "http://localhost:5000" }));
//middleware? 서버(응답)랑 클라이언트(요청) 사이에서 목적에 맞게 처리되는 함수들
//origin 말고 url을 넣어주면 그 외의 도메인에서는 접근이 불가능함
const corsOptions = {
  origin: "*", //"https://clone-81b9a.web.app/" 오류자꾸나서... 구냥 전체허용으로....
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.static("public"));
app.use(express.json());
//들어오는 모든 요청객체를 json으로 인식하기 위해서 express의 내장 메소드 사용

//라우트부분

app.get("/", (request, response) => response.status(200).send("안녕")); //200=>성공적으로 메세지가 전달되도록 하는 상태코드
//page 라우팅하기 위해 get 함수 사용(기본페이지Url과 view를 연결시켜주는것)
//req:클라이언트가 요청(url)
//res:서버에서 응답
//app.post("/",(req,res)=>res.status(200).send("bye"))하면 같은 경로라도 buy가 출력됨
//app.get("/react",(req, res)=>res.status(200).send("그냥 코딩 잘하는사람 잡아먹고 코딩장인 되고싶다")); //200=>성공적으로 메세지가 전달되도록 하는 상태코드

const calculateOrderAmount = (items) => {
  return items * 100;
};

app.post("/payments/create", async (request, response) => {
  const { items } = request.body;
  //const total = request.query.total;
  //console.log(" payment.js에서 가져온 total의 양은 다음과 같다!!  ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  response.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// app.post("/payments/create", async (request, response) => {
//   const total = request.query.total;

//   console.log("payment Request Received!!! >>> ", total);

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: total,
//     currency: "usd",
//     payment_method_types: ["card"],
//   });

//   response.status(200).send(paymentIntent);

//   //고객의 정보를 clientSecret에 담아서 send하면 payment useEffect안의 res로 전달된다
// });

exports.api = functions.https.onRequest(app);

//http이벤트를 처리하는 함수 만들기
//onRequest 이벤트를 수신대기

//http://localhost:5001/clone-81b9a/us-central1/api
