package com.hospital.service;

import com.hospital.repository.AdminRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public boolean login(String username, String password) {

        return adminRepository.findByUsername(username)
                .map(admin -> passwordEncoder.matches(
                        password,
                        admin.getPassword()
                ))
                .orElse(false);
    }
}