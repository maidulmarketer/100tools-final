import { api } from "../axios";

export async function getSubCategories() {
  return await api.get("/we/sub-categories");
}

export async function getSubCategory(slug) {
  return await api.get(`/we/sub-categories/${slug}`);
}

export async function createSubCategory(payload) {
  return await api.post("/we/sub-categories", payload);
}

export async function updateSubCategory(slug, payload) {
  return await api.patch(`/we/sub-categories/${slug}`, payload);
}

export async function deleteSubCategory(slug) {
  return await api.delete(`/we/sub-categories/${slug}`);
}
