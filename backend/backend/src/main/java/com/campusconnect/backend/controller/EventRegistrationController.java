package com.campusconnect.backend.controller;

import com.campusconnect.backend.dto.EventRegistrationResponse;
import com.campusconnect.backend.entity.EventRegistration;
import com.campusconnect.backend.service.EventRegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventRegistrationController {

    private final EventRegistrationService registrationService;

    public EventRegistrationController(
            EventRegistrationService registrationService) {

        this.registrationService = registrationService;
    }

    @PostMapping("/{eventId}/register")
    public ResponseEntity<EventRegistration> register(
            @PathVariable Long eventId,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                registrationService.register(email, eventId)
        );
    }

    @GetMapping("/{eventId}/registrations/count")
    public ResponseEntity<Long> getRegistrationCount(
            @PathVariable Long eventId) {

        return ResponseEntity.ok(
                registrationService.getRegistrationCount(eventId)
        );
    }

    @GetMapping("/my-registrations")
    public ResponseEntity<List<EventRegistrationResponse>> getMyRegistrations(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                registrationService.getMyRegistrations(email)
        );
    }
}