import axios from "./axiosConfig";

// Get all passengers for a specific trip
export const getPassengersByTrip = (tripId) =>
    axios.get(`/Passengers?tripId=${tripId}`);

// CRUD
export const addPassenger = (passenger) => axios.post("/Passengers", passenger);
export const getPassenger = (id) => axios.get(`/Passengers/${id}`);
export const updatePassenger = (id, passenger) => axios.put(`/Passengers/${id}`, passenger);
export const deletePassenger = (id) => axios.delete(`/Passengers/${id}`);
