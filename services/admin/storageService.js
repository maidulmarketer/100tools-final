import { api } from "../axios";

export async function getStorage() {
  return await api.get("/we/storage");
}

export async function updateStorage(payload) {
  return await api.patch(`/we/storage`, payload);
}
