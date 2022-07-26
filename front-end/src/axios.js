import axios from "axios";

const axios1 = axios.create({
  baseURL: "https://hoyeonjin-learnbook.herokuapp.com",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export default axios1;
