import { api } from "../axios";

export async function getRedirects() {
  return await api.get("/we/redirect");
}

export async function getRedirect(uid) {
  return await api.get(`/we/redirect/${uid}`);
}

export async function createRedirect(payload) {
  return await api.post("/we/redirect", payload);
}

export async function updateRedirect(uid, payload) {
  return await api.patch(`/we/redirect/${uid}`, payload);
}

export async function deleteRedirect(uid) {
  return await api.delete(`/we/redirect/${uid}`);
}
