import { userApi } from "../axios";

export async function getPostList(params) {
    return await userApi.get(`/me/posts`, {params});
  }

  export async function getPostDetails(slug) {
    return await userApi.get(`/me/posts/${slug}`);
  }