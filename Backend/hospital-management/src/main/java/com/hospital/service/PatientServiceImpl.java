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
    public Patient updatePatient(Long id, Patient patient) {

        Patient existingPatient = repository.findById(id)
                .orElseThrow();

        existingPatient.setName(patient.getName());
        existingPatient.setAge(patient.getAge());
        existingPatient.setGender(patient.getGender());
        existingPatient.setPhone(patient.getPhone());
        existingPatient.setAddress(patient.getAddress());
        existingPatient.setBloodGroup(patient.getBloodGroup());
        existingPatient.setDisease(patient.getDisease());

        return repository.save(existingPatient);
    }

    @Override
    public void deletePatient(Long id) {
        repository.deleteById(id);
    }
}