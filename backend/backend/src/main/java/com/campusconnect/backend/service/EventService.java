package com.campusconnect.backend.service;

import com.campusconnect.backend.entity.Event;
import com.campusconnect.backend.repository.EventRegistrationRepository;
import com.campusconnect.backend.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventRegistrationRepository eventRegistrationRepository;

    public EventService(
            EventRepository eventRepository,
            EventRegistrationRepository eventRegistrationRepository) {

        this.eventRepository = eventRepository;
        this.eventRegistrationRepository = eventRegistrationRepository;
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Event not found"));
    }

    public Event updateEvent(Long id, Event updatedEvent) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Event not found"));

        event.setTitle(updatedEvent.getTitle());
        event.setDescription(updatedEvent.getDescription());
        event.setLocation(updatedEvent.getLocation());
        event.setEventDate(updatedEvent.getEventDate());
        event.setOrganizer(updatedEvent.getOrganizer());

        return eventRepository.save(event);
    }

    @Transactional
    public void deleteEvent(Long id) {

        System.out.println("DELETE REQUESTED FOR ID: " + id);

        Event event = eventRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Event not found with ID: " + id
                        ));

        System.out.println(
                "FOUND EVENT: " +
                event.getId() +
                " - " +
                event.getTitle()
        );

        // First delete registrations associated with this event
        eventRegistrationRepository.deleteByEvent(event);

        System.out.println(
                "REGISTRATIONS DELETED FOR EVENT: " + id
        );

        // Then delete the event
        eventRepository.delete(event);

        System.out.println(
                "EVENT DELETED: " + id
        );
    }
}