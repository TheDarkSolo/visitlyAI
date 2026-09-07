package com.visitly.service;

import com.visitly.dto.ConversationDtos.ConversationSummary;
import com.visitly.dto.ConversationDtos.MessageResponse;
import com.visitly.entity.Conversation;
import com.visitly.entity.Message;

public final class ConversationMapper {

    private ConversationMapper() {
    }

    public static ConversationSummary toSummary(Conversation conversation) {
        return new ConversationSummary(
                conversation.getId(),
                conversation.getLead().getId(),
                conversation.getLead().getName(),
                conversation.getChannel(),
                conversation.getOwnerType(),
                conversation.getOwnerManager() != null ? conversation.getOwnerManager().getId() : null,
                conversation.getStatus(),
                conversation.getUpdatedAt()
        );
    }

    public static MessageResponse toMessageResponse(Message message) {
        return new MessageResponse(
                message.getId(),
                message.getSender(),
                message.getContent(),
                message.getCreatedAt()
        );
    }
}
