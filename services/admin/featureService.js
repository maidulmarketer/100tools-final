import { api } from "../axios";

export async function getFeatures() {
  return await api.get("/we/features");
}

export async function getFeature(slug) {
  return await api.get(`/we/features/${slug}`);
}

export async function createFeature(payload) {
  return await api.post("/we/features", payload);
}

export async function updateFeature(slug, payload) {
  return await api.patch(`/we/features/${slug}`, payload);
}

export async function deleteFeature(slug) {
  return await api.delete(`/we/features/${slug}`);
}
