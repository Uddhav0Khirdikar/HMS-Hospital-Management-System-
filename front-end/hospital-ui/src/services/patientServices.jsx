import axios from "axios";
import API_URL from "./api";

const PATIENTS_API_URL = `${API_URL}/patients`;

export const getPatients = () => {
    return axios.get(PATIENTS_API_URL);
};

export const savePatient = (patient)=>{

    return axios.post(PATIENTS_API_URL, patient);

};

export const getPatientById = (id) => {
    return axios.get(`${PATIENTS_API_URL}/${id}`);
};

export const deletePatient = (id) => {
    return axios.delete(`${PATIENTS_API_URL}/${id}`);
};