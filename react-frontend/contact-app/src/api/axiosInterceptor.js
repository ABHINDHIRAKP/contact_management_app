import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const res = await axios.post('http://localhost:5000/api/refresh', {}, {
          withCredentials: true
        });
        accessToken = res.data.accessToken;
        localStorage.setItem("accessToken", accessToken);

        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return api(error.config);
      } catch (err) {
        console.error("Refresh failed, redirecting to login...");
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
