import axios from "axios";

const API_URL = "http://localhost:8080/appointments";

export const addAppointment = (appointment) => {
    return axios.post(API_URL, appointment);
};

export const getAllAppointments = () => {
    return axios.get(API_URL);
};

export const getAppointmentById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const updateAppointment = (id, appointment) => {
            
    return axios.put(`${API_URL}/${id}`, appointment);
};

export const deleteAppointment = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};