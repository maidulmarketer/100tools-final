import { api } from "../axios";
import { contentTypeHeader } from "../configs";

export async function getStaffs() {
  return await api.get("/we/users");
}

export async function getStaff(slug) {
  return await api.get(`/we/users/${slug}`);
}

export async function createStaff(payload) {
  return await api.post("/we/users", payload);
}

export async function updateStaff(slug, payload) {
  return await api.patch(`/we/users/${slug}`, payload);
}

export async function deleteStaff(slug) {
  return await api.delete(`/we/users/${slug}`);
}
