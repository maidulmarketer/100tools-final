import { api } from "../axios";
import { contentTypeHeader } from "../configs";

export async function getBlogs() {
  return await api.get("/posts");
}

export async function getBlog(slug) {
  return await api.get(`/posts/${slug}`);
}

export async function createBlog(payload) {
  return await api.post("/posts", payload, contentTypeHeader.formData);
}

export async function updateBlog(slug, payload) {
  return await api.patch(`/posts/${slug}`, payload, contentTypeHeader.formData);
}

export async function deleteBlog(slug) {
  return await api.delete(`/posts/${slug}`);
}
