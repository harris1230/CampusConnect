package com.campusconnect.backend.service;

import com.campusconnect.backend.dto.LoginResponse;
import com.campusconnect.backend.entity.Role;
import com.campusconnect.backend.entity.User;
import com.campusconnect.backend.repository.UserRepository;
import com.campusconnect.backend.security.JwtService;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostConstruct
    public void createAdminUser() {

        String adminEmail = "admin@campusconnect.com";

        var existingUser = userRepository.findByEmail(adminEmail);

        if (existingUser.isPresent()) {

            User admin = existingUser.get();

            if (admin.getRole() != Role.ADMIN) {
                admin.setRole(Role.ADMIN);
                userRepository.save(admin);

                System.out.println("=================================");
                System.out.println("EXISTING USER PROMOTED TO ADMIN");
                System.out.println("Email: " + adminEmail);
                System.out.println("Role: ADMIN");
                System.out.println("=================================");
            }

        } else {

            User admin = new User(
                    "Admin",
                    adminEmail,
                    passwordEncoder.encode("admin123"),
                    Role.ADMIN
            );

            userRepository.save(admin);

            System.out.println("=================================");
            System.out.println("ADMIN USER CREATED");
            System.out.println("Email: admin@campusconnect.com");
            System.out.println("Password: admin123");
            System.out.println("=================================");
        }
    }

    public User registerUser(String name, String email, String password) {

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already registered");
        }

        String encodedPassword = passwordEncoder.encode(password);

        User user = new User(
                name,
                email,
                encodedPassword,
                Role.STUDENT
        );

        return userRepository.save(user);
    }

    public LoginResponse loginUser(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return new LoginResponse(
                token,
                user.getEmail(),
                user.getRole().name()
        );
    }
}