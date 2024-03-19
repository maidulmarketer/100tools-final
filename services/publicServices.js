import { api } from "./axios";

export async function getPublicTools() {
  return await api.get("/public/tools");
}

export async function getPublicBlogs() {
  return await api.get("/public/posts");
}

export async function getPublicSubCategories() {
  return await api.get("/public/sub-categories");
}

export async function getPublicStorage() {
  return await api.get("/storage");
}

export async function getUserRedirects() {
  return await api.get("/me/redirect");
}
