package com.hospital.Controller;

import com.hospital.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public boolean login(@RequestBody Map<String, String> request) {

        String username = request.get("username");
        String password = request.get("password");

        return adminService.login(username, password);
    }
}