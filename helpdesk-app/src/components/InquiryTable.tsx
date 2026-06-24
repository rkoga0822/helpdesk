import type { Inquiry } from '../types/inquiry'
import { InquiryRow } from './InquiryRow'

type InquiryTableProps = {
  inquiries: Inquiry[]
  onSelect: (id: number) => void
}

// 一覧テーブル全体
export function InquiryTable({ inquiries, onSelect }: InquiryTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>タイトル</th>
          <th>ステータス</th>
          <th>投稿者</th>
          <th>日時</th>
        </tr>
      </thead>
      <tbody>
        {inquiries.map((inquiry) => (
          <InquiryRow key={inquiry.id} inquiry={inquiry} onSelect={onSelect} />
        ))}
      </tbody>
    </table>
  )
}
