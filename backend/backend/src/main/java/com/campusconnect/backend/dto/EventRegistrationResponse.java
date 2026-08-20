package com.campusconnect.backend.dto;

import com.campusconnect.backend.entity.EventRegistration;

import java.time.LocalDateTime;

public class EventRegistrationResponse {

    private Long id;
    private LocalDateTime registeredAt;

    private Long eventId;
    private String title;
    private String description;
    private String location;
    private LocalDateTime eventDate;
    private String organizer;

    public EventRegistrationResponse(EventRegistration registration) {

        this.id = registration.getId();
        this.registeredAt = registration.getRegisteredAt();

        this.eventId = registration.getEvent().getId();
        this.title = registration.getEvent().getTitle();
        this.description = registration.getEvent().getDescription();
        this.location = registration.getEvent().getLocation();
        this.eventDate = registration.getEvent().getEventDate();
        this.organizer = registration.getEvent().getOrganizer();
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }

    public Long getEventId() {
        return eventId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getLocation() {
        return location;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public String getOrganizer() {
        return organizer;
    }
}