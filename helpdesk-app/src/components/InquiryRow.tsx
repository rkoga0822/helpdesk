import type { Inquiry } from '../types/inquiry'
import { StatusBadge } from './StatusBadge'
import {
  Button,
  TableCell,
  TableRow,
} from "@mui/material";

type InquiryRowProps = {
  inquiry: Inquiry
  onSelect: (id: number) => void
}

// 一覧の 1 行。タイトルクリックで詳細へ遷移する
export function InquiryRow({
  inquiry,
  onSelect,
}: InquiryRowProps) {
  return (
    <TableRow hover>
      <TableCell>{inquiry.id}</TableCell>

      <TableCell>
        <Button
          variant="text"
          onClick={() => onSelect(inquiry.id)}
        >
          {inquiry.title}
        </Button>
      </TableCell>

      <TableCell>
        <StatusBadge status={inquiry.status} />
      </TableCell>

      <TableCell>{inquiry.requester}</TableCell>

      <TableCell>{inquiry.created_at}</TableCell>
    </TableRow>
  );
}
