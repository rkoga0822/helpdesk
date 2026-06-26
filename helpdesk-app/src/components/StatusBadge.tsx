import type { InquiryStatus } from "../types/inquiry";
import { inquiryStatusLabel } from "../types/inquiry";
import { Chip } from "@mui/material";

const statusClass: Record<InquiryStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

type StatusBadgeProps = {
  status: InquiryStatus;
};

// ステータスの表示専用コンポーネント
export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusClass[status]}`}
    >
      {inquiryStatusLabel[status]}
    </span>
  );
}
