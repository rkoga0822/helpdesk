import type { InquiryStatus } from '../types/inquiry'
import { inquiryStatusLabel } from '../types/inquiry'

type StatusBadgeProps = {
  status: InquiryStatus
}

// ステータスの表示専用コンポーネント
export function StatusBadge({ status }: StatusBadgeProps) {
  return <span>{inquiryStatusLabel[status]}</span>
}
