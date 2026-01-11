import axios from "./axiosConfig";

// Trip endpoints
export const getTrips = () => axios.get("/Trip");
export const getTrip = (id) => axios.get(`/Trip/${id}`);
export const addTrip = (trip) => axios.post("/Trip", trip);
export const updateTrip = (id, trip) => axios.put(`/Trip/${id}`, trip);
export const deleteTrip = (id) => axios.delete(`/Trip/${id}`);

// Passengers
export const getPassengersByTrip = (tripId) => axios.get(`/Trip/${tripId}/passengers`);

// Image upload
export const uploadPassengerImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post("/Trip/Upload/passengers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};
