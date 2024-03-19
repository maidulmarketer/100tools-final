import { api } from "../axios";

export async function getUsers() {
  return await api.get("/we/google/users");
}

export async function getUser(slug) {
  return await api.get(`/we/google/users/${slug}`);
}
