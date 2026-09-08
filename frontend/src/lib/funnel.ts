import { FunnelStage } from "./types";

export const STAGES: FunnelStage[] = ["CONTACTED", "QUALIFIED", "BOOKED", "VISITED", "SOLD"];

export const STAGE_LABELS: Record<FunnelStage, string> = {
  CONTACTED: "Обращение",
  QUALIFIED: "Квалифицирован",
  BOOKED: "Записан",
  VISITED: "Пришёл",
  SOLD: "Сделка",
};
