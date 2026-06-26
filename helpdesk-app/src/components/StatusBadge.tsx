import type { InquiryStatus } from "../types/inquiry";
import { inquiryStatusLabel } from "../types/inquiry";
import { Chip } from "@mui/material";

type StatusBadgeProps = {
  status: InquiryStatus;
};

// ステータスの表示専用コンポーネント
export function StatusBadge({ status }: StatusBadgeProps) {
  const colorMap = {
    pending: "warning",
    in_progress: "info",
    completed: "success",
  } as const;

  return (
    <Chip
      label={inquiryStatusLabel[status]}
      color={colorMap[status]}
      size="small"
      sx={{
        alignSelf: "flex-start",
      }}
    />
  );
}