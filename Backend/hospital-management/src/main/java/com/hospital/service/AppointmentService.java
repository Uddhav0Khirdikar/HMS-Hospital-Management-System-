package com.hospital.service;

import com.hospital.entity.Appointment;

import java.util.List;
import java.util.Optional;

public interface AppointmentService {

    Appointment saveAppointment(Appointment appointment);

    List<Appointment> getAllAppointments();

    Optional<Appointment> getAppointmentById(Long id);

    Appointment updateAppointment(Long id, Appointment appointment);

    void deleteAppointment(Long id);
}