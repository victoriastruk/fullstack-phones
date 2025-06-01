import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:5000/api" });

export const getPhones = () => axiosInstance.get("/phones");

export const updateNfc = (id, data) =>
  axiosInstance.patch(`/phones/${id}`, data);

export const deletePhone = (id) => axiosInstance.delete(`phones/${id}`);
