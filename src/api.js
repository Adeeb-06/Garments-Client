import axios from "axios";

const api = axios.create({
  baseURL: "https://garments-server-indol.vercel.app/",
});

export default api;
