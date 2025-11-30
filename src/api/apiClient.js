import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://10.188.72.246:5030/api", // 🔁 change for device / prod
  timeout: 10000,
});

// Add token from AuthContext later
export const setAuthToken = (token) => {
  if (token) {
    console.log("Setting auth token:", token);
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

export default apiClient;