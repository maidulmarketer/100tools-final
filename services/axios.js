import axios from "axios";
import { signOut } from "next-auth/react";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const setToken = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      signOut();
    }

    // If it's not a 401 error, forward the error to the calling function
    return Promise.reject(error);
  }
);

// __________________________USER API________________________________

const userApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const setIdentity = (id) => {
  userApi.defaults.headers.common["identity"] = id;
};

// const isServer = typeof window === "undefined";

// api.interceptors.request.use(async (config) => {
//   if (isServer) {
//     const { cookies } = await import("next/headers"),
//       token = cookies().get("token")?.value;

//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//   } else {
//     const token = document.cookie.replace(
//       /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
//       "$1"
//     );

//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//   }

//   return config;
// });

export { api, setToken, userApi, setIdentity };
