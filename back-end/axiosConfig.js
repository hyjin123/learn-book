require("dotenv").config();

if (process.env.REACT_APP_BACKEND_URL) {
  Axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
}
