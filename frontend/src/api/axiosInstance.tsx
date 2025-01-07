import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//   (response) => response, // Response berhasil
//   async (error) => {
//     const originalRequest = error.config;
//     const status = error.response?.status;

//     if ((status === 401 || status === 403) && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const { data } = await axiosInstance.get("/auth/refresh-token");
//         console.log("Refreshing")
//         if (data.success) {
//           return axiosInstance(originalRequest); // Ulangi request yang gagal
//         }
//       } catch (err) {
//         console.error("Error refreshing token:", err);
//       }
//     }

//     return Promise.reject(error); // Lempar error jika tidak ditangani
//   }
// );

export default axiosInstance;
