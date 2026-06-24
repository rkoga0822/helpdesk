import type { Inquiry } from '../types/inquiry'
import { StatusBadge } from './StatusBadge'

type InquiryRowProps = {
  inquiry: Inquiry
  onSelect: (id: number) => void
}

// 一覧の 1 行。タイトルクリックで詳細へ遷移する
export function InquiryRow({ inquiry, onSelect }: InquiryRowProps) {
  return (
    <tr>
      <td>{inquiry.id}</td>
      <td>
        <button onClick={() => onSelect(inquiry.id)}>{inquiry.title}</button>
      </td>
      <td>
        <StatusBadge status={inquiry.status} />
      </td>
      <td>{inquiry.requester}</td>
      <td>{inquiry.created_at}</td>
    </tr>
  )
}
