package com.visitly.controller;

import com.visitly.dto.BookingDtos.BookingResponse;
import com.visitly.dto.BookingDtos.CreateBookingRequest;
import com.visitly.dto.BookingDtos.UpdateBookingRequest;
import com.visitly.entity.Booking;
import com.visitly.entity.Lead;
import com.visitly.repository.BookingRepository;
import com.visitly.repository.LeadRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

/**
 * Real, minimal booking record — no Google Calendar integration yet
 * (see NoopCalendarService). A manager creates a row here once they've
 * actually confirmed a time with the lead, so "записал(а) вас" in the
 * bot's script corresponds to something real instead of a promise that
 * evaporates the moment the conversation ends.
 */
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingRepository bookingRepository;
    private final LeadRepository leadRepository;

    public BookingController(BookingRepository bookingRepository, LeadRepository leadRepository) {
        this.bookingRepository = bookingRepository;
        this.leadRepository = leadRepository;
    }

    @GetMapping
    public List<BookingResponse> list() {
        return bookingRepository.findAllByOrderByScheduledAtAsc().stream()
                .map(this::toResponse)
                .toList();
    }

    @PostMapping
    public BookingResponse create(@Valid @RequestBody CreateBookingRequest request) {
        Lead lead = leadRepository.findById(request.leadId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lead not found"));

        Booking booking = new Booking();
        booking.setLead(lead);
        booking.setScheduledAt(request.scheduledAt());
        booking.setNotes(request.notes());

        return toResponse(bookingRepository.save(booking));
    }

    @PatchMapping("/{id}")
    @Transactional
    public BookingResponse update(@PathVariable UUID id, @RequestBody UpdateBookingRequest request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        if (request.scheduledAt() != null) booking.setScheduledAt(request.scheduledAt());
        if (request.notes() != null) booking.setNotes(request.notes());
        if (request.status() != null) booking.setStatus(request.status());

        return toResponse(bookingRepository.save(booking));
    }

    private BookingResponse toResponse(Booking booking) {
        return new BookingResponse(
                booking.getId(),
                booking.getLead().getId(),
                booking.getLead().getName(),
                booking.getLead().getPhone(),
                booking.getScheduledAt(),
                booking.getNotes(),
                booking.getStatus(),
                booking.getCreatedAt()
        );
    }
}
