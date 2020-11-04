import axios from "axios";

const API = axios.create({
  baseURL:
    "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

export default API;
