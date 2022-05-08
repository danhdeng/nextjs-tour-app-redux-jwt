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
      // @ts-ignore: already check null before access the profile
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const createTour = (tourData: any) => API.post("/tour", tourData);
export const getTours = (page: number) => API.get(`/tour?page=${page}`);
export const getTour = (id: string) => API.get(`/tour/${id}`);
export const deleteTour = (id: string) => API.delete(`/tour/${id}`);
export const updateTour = (updatedTourData: any, id: string) =>
  API.patch(`/tour/${id}`, updatedTourData);
export const getToursByUser = (userId: string) =>
  API.get(`/tour/userTours/${userId}`);

export const getToursBySearch = (searchQuery: any) =>
  API.get(`/tour/search?searchQuery=${searchQuery}`);

export const getTagTours = (tag: string) => API.get(`/tour/tag/${tag}`);
export const getRelatedTours = (tags: any) =>
  API.post(`/tour/relatedTours`, tags);
export const likeTour = (id: string) => API.patch(`/tour/like/${id}`);
