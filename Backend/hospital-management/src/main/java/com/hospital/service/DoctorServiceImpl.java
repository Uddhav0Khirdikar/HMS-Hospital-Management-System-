package com.hospital.service;
import com.hospital.exception.ResourceNotFoundException;
import com.hospital.entity.Doctor;
import com.hospital.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import com.hospital.exception.ResourceNotFoundException;
@Service
public class DoctorServiceImpl implements DoctorService{

    private final DoctorRepository doctorRepository;

    public DoctorServiceImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    // Get all doctors
    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }	

    // Save doctor
    @Override
    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // Get doctor by ID
    @Override
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
        		.orElseThrow(() ->
                new ResourceNotFoundException("Doctor not found with id: " + id));
    }

    

    // Delete doctor
    @Override
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

    @Override
    public Doctor updateDoctor(Long id, Doctor doctor) {

        Doctor existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        existingDoctor.setName(doctor.getName());
        existingDoctor.setSpecialization(doctor.getSpecialization());
        existingDoctor.setQualification(doctor.getQualification());
        existingDoctor.setExperience(doctor.getExperience());

        return doctorRepository.save(existingDoctor);
    }
}