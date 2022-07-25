import axios from "axios";

const axios1 = axios.create({
  baseURL: "https://hoyeonjin-learnbook.herokuapp.com",
  timeout: 1000,
  headers: { crossorigin: true },
});

export default axios1;
