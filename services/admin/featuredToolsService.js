import { api } from "../axios";

export async function getFeaturedTools(params) {
  return await api.get("/we/feature-tools", { params });
}

export async function getFeaturedTool(slug) {
  return await api.get("/we/feature-tools/" + slug);
}

export async function addFeaturedTool(payload) {
  return await api.post(`/we/feature-tools`, payload);
}

export async function updateFeaturedTool(slug, payload) {
  return await api.patch(`/we/feature-tools/${slug}`, payload);
}

export async function deleteFeaturedTool(slug) {
  return await api.delete(`/we/feature-tools/${slug}`);
}
