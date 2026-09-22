import axios from "axios";


const API_URL = "http://localhost:8080/patients";

export const getPatients = () => {
    return axios.get(API_URL);
};

export const savePatient = (patient)=>{

    return axios.post(API_URL, patient);

};

export const getPatientById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const deletePatient = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};