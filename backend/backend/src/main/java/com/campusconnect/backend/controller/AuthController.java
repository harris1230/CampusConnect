package com.campusconnect.backend.controller;

import com.campusconnect.backend.entity.User;
import com.campusconnect.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.campusconnect.backend.dto.LoginRequest;
import com.campusconnect.backend.dto.LoginResponse;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(
    origins = "https://campusconnect-1-h9sq.onrender.com"
)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String password) {

        User user = userService.registerUser(name, email, password);

        return ResponseEntity.ok(user);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        LoginResponse response = userService.loginUser(
            request.getEmail(),
            request.getPassword()
    );

        return ResponseEntity.ok(response);
    }
}