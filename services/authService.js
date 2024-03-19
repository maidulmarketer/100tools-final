import { api, userApi } from "./axios";

export async function authenticateAdmin(credentials) {
  return await api.post("/login", credentials);
}

export async function registerGoogleUser(googleUser) {
  return await userApi.post("/register", googleUser);
}
