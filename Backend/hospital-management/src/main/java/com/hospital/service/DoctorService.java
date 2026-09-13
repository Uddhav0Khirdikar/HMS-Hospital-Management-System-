package com.hospital.service;

import com.hospital.entity.Doctor;
import java.util.List;


public interface DoctorService {

	List<Doctor> getAllDoctors();

	Doctor getDoctorById(Long id);

	Doctor saveDoctor(Doctor doctor);

	Doctor updateDoctor(Long id, Doctor doctor);

	void deleteDoctor(Long id);

  
}