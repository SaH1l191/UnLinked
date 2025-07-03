import axios from "axios";
 
export const axiosInstance = axios.create({
    baseURL: "https://unlinked-ff2c.onrender.com/api/v1",
    withCredentials: true,
});