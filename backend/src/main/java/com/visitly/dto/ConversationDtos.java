package com.visitly.dto;

import com.visitly.entity.Channel;
import com.visitly.entity.ConversationStatus;
import com.visitly.entity.MessageSender;
import com.visitly.entity.OwnerType;
import jakarta.validation.constraints.NotBlank;

import java.time.Instant;
import java.util.UUID;

public class ConversationDtos {

    public record ConversationSummary(
            UUID id,
            UUID leadId,
            String leadName,
            Channel channel,
            OwnerType ownerType,
            UUID ownerManagerId,
            ConversationStatus status,
            Instant updatedAt
    ) {
    }

    public record MessageResponse(
            UUID id,
            MessageSender sender,
            String content,
            Instant createdAt
    ) {
    }

    public record SendMessageRequest(@NotBlank String text) {
    }
}
