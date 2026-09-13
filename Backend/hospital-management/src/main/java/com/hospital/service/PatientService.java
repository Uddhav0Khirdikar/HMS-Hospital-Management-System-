package com.hospital.service;

import com.hospital.entity.Patient;
import java.util.List;

public interface PatientService {

    Patient savePatient(Patient patient);

    List<Patient> getAllPatients();

    Patient getPatientById(Long id);

    void deletePatient(Long id);
}