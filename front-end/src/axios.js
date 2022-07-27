import axios from "axios";

const axios1 = axios.create({
  baseURL: "https://hoyeonjin-learnbook.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export default axios1;
