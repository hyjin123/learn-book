import axios from "axios";

// used in production
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

// used in development
// const axios1 = axios.create({
//   baseURL: "http://localhost:3002",
// });

export default axios1;
