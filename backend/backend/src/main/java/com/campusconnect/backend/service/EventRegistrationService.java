package com.campusconnect.backend.service;

import com.campusconnect.backend.dto.EventRegistrationResponse;
import com.campusconnect.backend.entity.Event;
import com.campusconnect.backend.entity.EventRegistration;
import com.campusconnect.backend.entity.User;
import com.campusconnect.backend.repository.EventRegistrationRepository;
import com.campusconnect.backend.repository.EventRepository;
import com.campusconnect.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventRegistrationService {

    private final EventRegistrationRepository registrationRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public EventRegistrationService(
            EventRegistrationRepository registrationRepository,
            UserRepository userRepository,
            EventRepository eventRepository) {

        this.registrationRepository = registrationRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    public EventRegistration register(String email, Long eventId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (registrationRepository.existsByUserAndEvent(user, event)) {
            throw new RuntimeException("Already registered for this event");
        }

        EventRegistration registration =
                new EventRegistration(user, event);

        return registrationRepository.save(registration);
    }

    public long getRegistrationCount(Long eventId) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        return registrationRepository.countByEvent(event);
    }

    public List<EventRegistrationResponse> getMyRegistrations(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return registrationRepository.findByUser(user)
                .stream()
                .map(EventRegistrationResponse::new)
                .toList();
    }
}