import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:5001/clone-81b9a/us-central1/api", // THE API Emulater URL
  baseURL: "https://clone-81b9a.web.app",
});

export default instance;
