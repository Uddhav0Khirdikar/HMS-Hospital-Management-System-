package com.hospital.service;

import com.hospital.entity.Appointment;
import com.hospital.entity.Doctor;
import com.hospital.entity.Patient;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.PatientRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository,PatientRepository patientRepository,DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    @Override
    public Appointment saveAppointment(Appointment appointment) {
    	Patient patient = patientRepository.findById(appointment.getPatient().getId()).orElseThrow();
  

    	Doctor doctor = doctorRepository.findById(appointment.getDoctor().getId()).orElseThrow();

    	appointment.setPatient(patient);
    	appointment.setDoctor(doctor);

    	return appointmentRepository.save(appointment);
   
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    @Override
    public Appointment updateAppointment(Long id, Appointment appointment) {
        appointment.setId(id);
        return appointmentRepository.save(appointment);
    }

    @Override
    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}