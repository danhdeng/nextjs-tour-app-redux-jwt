import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const API = axios.create({
  baseURL: `${
    devEnv
      ? process.env.NEXT_PUBLIC_API_ENDPOINT_DEV
      : process.env.NEXT_PUBLIC_API_ENDPOINT_PROD
  }`,
});

API.interceptors.request.use((req: any) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      // @ts-ignore: already check not null
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData: any) => API.post("/users/signin", formData);
export const signUp = (formData: any) => API.post("/users/signup", formData);
export const googleSignIn = (result: any) =>
  API.post("/users/googleSignIn", result);
