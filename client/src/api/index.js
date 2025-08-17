import axios from "axios";

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL + "/api"});

export const getCpus = () => axiosInstance.get("/cpus");

export const createPhone = (data) => axiosInstance.post("/phones", data);

export const getPhones = () => axiosInstance.get("/phones");

export const updateNfc = (id, data) =>
  axiosInstance.patch(`/phones/${id}`, data);

export const deletePhone = (id) => axiosInstance.delete(`phones/${id}`);
