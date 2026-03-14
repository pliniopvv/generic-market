import axios from "axios";

export default function configAxios() {
    const token = localStorage.getItem("access_token");
    if (token)
        axios.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
}