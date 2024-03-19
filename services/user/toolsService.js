import { userApi } from "../axios";
import { contentTypeHeader } from "../configs";

export async function getUserTools(params) {
  return await userApi.get("/me/tools", { params });
}

export async function getCategoryTools(subCategory_slug, params) {
  return await userApi.get(`/me/tools/subcategory/${subCategory_slug}`, { params });
}
export async function getCategoryToolText(subCategory_slug) {
  return await userApi.get(`/me/tools/subcategory/${subCategory_slug}/extra-fields`);
}

export async function getLovedTools() {
  return await userApi.get("/me/tools/love-tool");
}

export async function getCategoryCounts(subCategory_slug) {
  return await userApi.get(`/me/tools/subcategory/${subCategory_slug}/counts`);
}

export async function getCounts() {
  return await userApi.get("/me/counts");
}

export async function getUserToolDetails(slug) {
  return await userApi.get(`/me/tools/${slug}`);
}

export async function requestTool(payload) {
  return await userApi.post("/me/tools", payload, contentTypeHeader.formData);
}

export async function submitFeedback(payload) {
  return await userApi.post("/me/ratings", payload);
}

export async function patchUserTool(slug, payload) {
  return await userApi.patch(`/me/tools/${slug}`, payload);
}

export async function verificationTool(slug){
  return await userApi.get(`/me/tools/${slug}/verify`)
}

export async function getFeaturedTools(){
  return await userApi.get(`/me/feature-tools`)
}
