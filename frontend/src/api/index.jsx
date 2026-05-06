import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL?.replace(/\/$/, "");
const baseURL = apiUrl ? (apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`) : "/api";

const api = axios.create({
  baseURL,
});

export default api;
