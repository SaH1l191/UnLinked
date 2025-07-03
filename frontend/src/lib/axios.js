import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "/api/v1/", // for local dev
    withCredentials: true,
});
