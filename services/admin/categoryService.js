import { api } from "../axios";
import { contentTypeHeader } from "../configs";

export async function getCategories() {
  return await api.get("/we/categories");
}

export async function getCategory(slug) {
  return await api.get(`/we/categories/${slug}`);
}

export async function createCategory(payload) {
  return await api.post("/we/categories", payload, contentTypeHeader.formData);
}

export async function updateCategory(slug, payload) {
  return await api.patch(
    `/we/categories/${slug}`,
    payload,
    contentTypeHeader.formData
  );
}

export async function deleteCategory(slug) {
  return await api.delete(`/we/categories/${slug}`);
}
