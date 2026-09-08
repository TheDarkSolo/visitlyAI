package com.visitly.dto;

import com.visitly.entity.BookingStatus;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.UUID;

public class BookingDtos {

    public record BookingResponse(
            UUID id,
            UUID leadId,
            String leadName,
            String leadPhone,
            Instant scheduledAt,
            String notes,
            BookingStatus status,
            Instant createdAt
    ) {
    }

    public record CreateBookingRequest(
            @NotNull UUID leadId,
            @NotNull Instant scheduledAt,
            String notes
    ) {
    }

    public record UpdateBookingRequest(
            Instant scheduledAt,
            String notes,
            BookingStatus status
    ) {
    }
}
