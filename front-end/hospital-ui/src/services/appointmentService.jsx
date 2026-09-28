import axios from "axios";
import API_URL from "./api";
const APPOINTMENTS_API_URL = `${API_URL}/appointments`;

export const addAppointment = (appointment) => {
    return axios.post(APPOINTMENTS_API_URL, appointment);
};

export const getAllAppointments = () => {
    return axios.get(APPOINTMENTS_API_URL);
};

export const getAppointmentById = (id) => {
    return axios.get(`${APPOINTMENTS_API_URL}/${id}`);
};

export const updateAppointment = (id, appointment) => {
            
    return axios.put(`${APPOINTMENTS_API_URL}/${id}`, appointment);
};

export const deleteAppointment = (id) => {
    return axios.delete(`${APPOINTMENTS_API_URL}/${id}`);
};