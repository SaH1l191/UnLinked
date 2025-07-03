import axios from "axios";

CLIENT_URL= "https://unlinked-ff2c.onrender.com";
// CLIENT_URL="http://localhost:5173"

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
    baseURL: `${CLIENT_URL}/api/v1/`, // for local dev
})
