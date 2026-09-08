package com.visitly.repository;

import com.visitly.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface BookingRepository extends JpaRepository<Booking, UUID> {

    // JOIN FETCH avoids a LazyInitializationException on booking.getLead() when mapping to a
    // response DTO — open-in-view is disabled, so the lead must be loaded in this same query.
    @Query("SELECT b FROM Booking b JOIN FETCH b.lead ORDER BY b.scheduledAt ASC")
    List<Booking> findAllByOrderByScheduledAtAsc();
}
