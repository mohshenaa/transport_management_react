import axios from "./axiosConfig";

export const getVehicles = () => axios.get("/Vehicle");
export const getVehicle = (id) => axios.get(`/Vehicle/${id}`);
export const addVehicle = (vehicle) => axios.post("/Vehicle", vehicle);
export const updateVehicle = (id, vehicle) => axios.put(`/Vehicle/${id}`, vehicle);
export const deleteVehicle = (id) => axios.delete(`/Vehicle/${id}`);
