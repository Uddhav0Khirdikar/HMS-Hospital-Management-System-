package com.hospital.Controller;

import com.hospital.entity.Patient;
import com.hospital.service.PatientService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {

    private final PatientService service;

    public PatientController(
            PatientService service) {
        this.service = service;
    }

    @PostMapping
    public Patient savePatient(
            @RequestBody Patient patient) {
    	 System.out.println(patient.getName());
    	    System.out.println(patient.getAge());
        return service.savePatient(patient);
    }

    @GetMapping
    public List<Patient> getAllPatients() {
        return service.getAllPatients();
    }

    @GetMapping("/{id}")
    public Patient getPatientById(
            @PathVariable Long id) {

        return service.getPatientById(id);
    }
    
    @PutMapping("/{id}")
    public Patient updatePatient(
            @PathVariable Long id,
            @RequestBody Patient patient) {

        return service.updatePatient(id, patient);
    }

    @DeleteMapping("/{id}")
    public String deletePatient(
            @PathVariable Long id) {

        service.deletePatient(id);
        return "Patient Deleted";
    }
}