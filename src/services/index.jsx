import axios from "axios";

const api = axios.create({
  baseURL: "https://contacts-api-hyan.herokuapp.com/",
  timeout: 5000,
  // headers: {},
});

export default api;
