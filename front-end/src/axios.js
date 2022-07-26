import axios from "axios";

const axios1 = axios.create({
  baseURL: "https://hoyeonjin-learnbook.herokuapp.com/",
  headers: {
    withCredentials: true,
  },
});

export default axios1;
