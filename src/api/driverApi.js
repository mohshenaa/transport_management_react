import axios from "./axiosConfig";

export const getDrivers = () => axios.get("/Driver");
export const getDriver = (id) => axios.get(`/Driver/${id}`);
export const addDriver = (driver) => axios.post("/Driver", driver);
export const updateDriver = (id, driver) => axios.put(`/Driver/${id}`, driver);
export const deleteDriver = (id) => axios.delete(`/Driver/${id}`);
