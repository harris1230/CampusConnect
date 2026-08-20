package com.campusconnect.backend.service;

import com.campusconnect.backend.repository.EventRegistrationRepository;
import com.campusconnect.backend.repository.EventRepository;
import com.campusconnect.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.campusconnect.backend.entity.Role;
import com.campusconnect.backend.entity.EventRegistration;
import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final EventRegistrationRepository registrationRepository;

    public AdminService(
            UserRepository userRepository,
            EventRepository eventRepository,
            EventRegistrationRepository registrationRepository) {

        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.registrationRepository = registrationRepository;
    }

    public long getTotalStudents() {
        return userRepository.countByRole(Role.STUDENT);
    }

    public long getTotalEvents() {
        return eventRepository.count();
    }

    public long getTotalRegistrations() {
        return registrationRepository.count();
    }
    public List<EventRegistration> getAllRegistrations() {
    return registrationRepository.findAll();
    }
    
}