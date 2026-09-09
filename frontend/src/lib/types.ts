export type Channel = "WHATSAPP" | "INSTAGRAM";
export type OwnerType = "BOT" | "MANAGER";
export type ConversationStatus = "OPEN" | "CLOSED";
export type MessageSender = "LEAD" | "BOT" | "MANAGER";
export type FunnelStage = "CONTACTED" | "QUALIFIED" | "BOOKED" | "VISITED" | "SOLD";
export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface ConversationSummary {
  id: string;
  leadId: string;
  leadName: string | null;
  channel: Channel;
  ownerType: OwnerType;
  ownerManagerId: string | null;
  status: ConversationStatus;
  updatedAt: string;
}

export interface MessageResponse {
  id: string;
  sender: MessageSender;
  content: string;
  createdAt: string;
}

export interface LeadResponse {
  id: string;
  name: string | null;
  phone: string | null;
  instagramHandle: string | null;
  budget: string | null;
  projectType: string | null;
  timeline: string | null;
  location: string | null;
  funnelStage: FunnelStage;
  createdAt: string;
  updatedAt: string;
}

export interface BookingResponse {
  id: string;
  leadId: string;
  leadName: string | null;
  leadPhone: string | null;
  scheduledAt: string;
  notes: string | null;
  status: BookingStatus;
  createdAt: string;
}
