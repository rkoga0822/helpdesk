import type { Inquiry } from '../types/inquiry'
import { InquiryRow } from './InquiryRow'
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";

type InquiryTableProps = {
  inquiries: Inquiry[]
  onSelect: (id: number) => void
}

// 一覧テーブル全体
export function InquiryTable({
  inquiries,
  onSelect,
}: InquiryTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>タイトル</TableCell>
            <TableCell>ステータス</TableCell>
            <TableCell>投稿者</TableCell>
            <TableCell>日時</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {inquiries.map((inquiry) => (
            <InquiryRow
              key={inquiry.id}
              inquiry={inquiry}
              onSelect={onSelect}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
