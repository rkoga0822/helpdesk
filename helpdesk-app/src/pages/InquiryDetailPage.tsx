import type { Inquiry, InquiryStatus } from '../types/inquiry'
import { StatusBadge } from '../components/StatusBadge'

type InquiryDetailPageProps = {
  inquiry: Inquiry
  onBack: () => void
  onUpdateStatus: (id: number, status: InquiryStatus) => void
  onDelete: (id: number) => void
}

// 詳細ページ。表示とユーザー操作の通知だけを担当し、API 呼び出しは App 側に置く
export function InquiryDetailPage({
  inquiry,
  onBack,
  onUpdateStatus,
  onDelete,
}: InquiryDetailPageProps) {
  return (
    <div>
      <button onClick={onBack}>← 一覧へ戻る</button>

      <h2>{inquiry.title}</h2>
      <StatusBadge status={inquiry.status} />
      <p>投稿者：{inquiry.requester}</p>
      <p>{inquiry.content}</p>
      <p>日時：{inquiry.created_at}</p>

      <div>
        <label>ステータス変更：</label>
        <select
          value={inquiry.status}
          onChange={(e) => onUpdateStatus(inquiry.id, e.target.value as InquiryStatus)}
        >
          <option value="pending">未対応</option>
          <option value="in_progress">対応中</option>
          <option value="completed">完了</option>
        </select>
      </div>

      <button onClick={() => onDelete(inquiry.id)}>削除</button>
    </div>
  )
}
