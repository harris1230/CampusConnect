package com.campusconnect.backend.dto;

public class RegistrationResponse {

    private Long id;

    private StudentInfo user;

    private EventInfo event;

    private String registeredAt;

    public RegistrationResponse(
            Long id,
            StudentInfo user,
            EventInfo event,
            String registeredAt) {

        this.id = id;
        this.user = user;
        this.event = event;
        this.registeredAt = registeredAt;
    }

    public Long getId() {
        return id;
    }

    public StudentInfo getUser() {
        return user;
    }

    public EventInfo getEvent() {
        return event;
    }

    public String getRegisteredAt() {
        return registeredAt;
    }

    public static class StudentInfo {

        private String name;
        private String email;
        private String role;

        public StudentInfo(
                String name,
                String email,
                String role) {

            this.name = name;
            this.email = email;
            this.role = role;
        }

        public String getName() {
            return name;
        }

        public String getEmail() {
            return email;
        }

        public String getRole() {
            return role;
        }
    }

    public static class EventInfo {

        private String title;
        private String location;

        public EventInfo(
                String title,
                String location) {

            this.title = title;
            this.location = location;
        }

        public String getTitle() {
            return title;
        }

        public String getLocation() {
            return location;
        }
    }
}