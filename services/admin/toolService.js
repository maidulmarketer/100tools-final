import { api } from "../axios";
import { contentTypeHeader } from "../configs";

export async function getTools(params) {
  return await api.get("/we/tools", { params });
}

export async function getRequestedTools(params) {
  return await api.get("/we/tools?requested=True", { params });
}

export async function getVerifiedRequestedTools() {
  return await api.get("/we/tools/verification/list");
}

export async function updateVerifiedToolStatus(slug, verified_status) {
  return await api.patch(`/we/tools/verification/list/${slug}`, { verified_status });
}

export async function updateRequestedToolStatus(slug, request_status) {
  return await api.patch(`/we/tools/${slug}/requested`, { request_status });
}

export async function getTool(slug) {
  return await api.get(`/we/tools/${slug}`);
}

export async function createTool(payload) {
  return await api.post("/we/tools", payload, contentTypeHeader.formData);
}

export async function updateTool(slug, payload) {
  return await api.patch(
    `/we/tools/${slug}`,
    payload,
    contentTypeHeader.formData
  );
}

export async function deleteTool(slug) {
  return await api.delete(`/we/tools/${slug}`);
}
