import apiClient from "./apiClient";

export async function loginApi({ phone, password }) {
  const res = await apiClient.post("/auth/login", { phone, password });
  console.log("loginApi response:", res.data);
  return res.data; // expected: { token, user }
}

export async function registerFarmerApi(payload) {
  const res = await apiClient.post("/auth/register", payload);
  return res.data;
}