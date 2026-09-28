    import axios from "axios";
    import API_URL from "./api";
    const DOCTORS_API_URL = `${API_URL}/doctors`;

    export const getDoctors = () => {
        return axios.get(DOCTORS_API_URL);
    };

    export const getDoctorById = (id) => {
        return axios.get(`${DOCTORS_API_URL}/${id}`);
    };

    export const addDoctor = (doctor) => {
        return axios.post(DOCTORS_API_URL, doctor);
    };

    export const updateDoctor = (id, doctor) => {
        return axios.put(`${DOCTORS_API_URL}/${id}`, doctor);
    };

    export const deleteDoctor = (id) => {
        return axios.delete(`${DOCTORS_API_URL}/${id}`);
    };

    export default {
        getDoctors,
        addDoctor,
        updateDoctor,
        deleteDoctor
    };