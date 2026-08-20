package com.campusconnect.backend.repository;

import com.campusconnect.backend.entity.Event;
import com.campusconnect.backend.entity.EventRegistration;
import com.campusconnect.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface EventRegistrationRepository
        extends JpaRepository<EventRegistration, Long> {

    boolean existsByUserAndEvent(User user, Event event);

    long countByEvent(Event event);

    List<EventRegistration> findByUser(User user);

    @Transactional
    void deleteByEvent(Event event);
}