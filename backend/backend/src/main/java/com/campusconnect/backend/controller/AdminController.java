package com.campusconnect.backend.controller;

import com.campusconnect.backend.entity.Event;
import com.campusconnect.backend.service.AdminService;
import com.campusconnect.backend.service.EventService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import com.campusconnect.backend.dto.RegistrationResponse;




import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;
    private final EventService eventService;

    public AdminController(
            AdminService adminService,
            EventService eventService) {

        this.adminService = adminService;
        this.eventService = eventService;
    }

    @GetMapping("/dashboard")
    public Map<String, Long> getDashboard() {

        Map<String, Long> dashboard = new HashMap<>();

        dashboard.put("totalStudents", adminService.getTotalStudents());
        dashboard.put("totalEvents", adminService.getTotalEvents());
        dashboard.put(
                "totalRegistrations",
                adminService.getTotalRegistrations()
        );

        return dashboard;
    }

    @GetMapping("/events")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }
    @PostMapping("/events")
    public ResponseEntity<Event> createEvent(
        @RequestBody Event event) {

        return ResponseEntity.ok(
            eventService.createEvent(event)
        );
    }
    @PutMapping("/events/{id}")
    public ResponseEntity<Event> updateEvent(
            @PathVariable Long id,
            @RequestBody Event event) {

        return ResponseEntity.ok(
                eventService.updateEvent(id, event)
        );
    }
    @DeleteMapping("/events/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {

        eventService.deleteEvent(id);

        return ResponseEntity.ok("Event deleted successfully");
    }
    @GetMapping("/registrations")
    public List<RegistrationResponse> getAllRegistrations() {

        return adminService.getAllRegistrations()
                .stream()
                .map(registration -> new RegistrationResponse(
                        registration.getId(),

                        new RegistrationResponse.StudentInfo(
                                registration.getUser().getName(),
                                registration.getUser().getEmail(),
                                registration.getUser().getRole().toString()
                        ),

                        new RegistrationResponse.EventInfo(
                                registration.getEvent().getTitle(),
                                registration.getEvent().getLocation()
                        ),

                        registration.getRegisteredAt().toString()
                ))
                .toList();
    }
}