import axios from "axios";

const axios1 = axios.create({
  baseURL: "https://hoyeonjin-learnbook.herokuapp.com",
  headers: { "Access-Control-Allow-Origin": "*" },
});

export default axios1;
