import axios from "axios";

const API_URL = "http://localhost:8080/doctors";

export const getDoctors = () => {
    return axios.get(API_URL);
};

export const getDoctorById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const addDoctor = (doctor) => {
    return axios.post(API_URL, doctor);
};

const updateDoctor = (id, doctor) => {
    return axios.put(`${API_URL}/${id}`, doctor);
};

const deleteDoctor = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export default {
    getDoctors,
    addDoctor,
    updateDoctor,
    deleteDoctor
};