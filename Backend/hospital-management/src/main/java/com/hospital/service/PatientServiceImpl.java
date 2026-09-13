package com.hospital.service;

import com.hospital.entity.Patient;
import com.hospital.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl
        implements PatientService {

    private final PatientRepository repository;

    public PatientServiceImpl(
            PatientRepository repository) {
        this.repository = repository;
    }

    @Override
    public Patient savePatient(Patient patient) {
        return repository.save(patient);
    }

    @Override
    public List<Patient> getAllPatients() {
        return repository.findAll();
    }

    @Override
    public Patient getPatientById(Long id) {
        return repository.findById(id)
                .orElseThrow();
    }

    @Override
    public void deletePatient(Long id) {
        repository.deleteById(id);
    }
}