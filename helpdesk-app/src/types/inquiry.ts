export type InquiryStatus = 'pending' | 'in_progress' | 'completed'

// ステータスの表示ラベル（UI 用）
export const inquiryStatusLabel: Record<InquiryStatus, string> = {
  pending: '未対応',
  in_progress: '対応中',
  completed: '完了',
}

// API（Laravel）から返ってくる問い合わせデータ
export type Inquiry = {
  id: number
  title: string
  content: string
  requester: string
  status: InquiryStatus
  created_at: string
}

// 新規登録でサーバーに送るデータ（id / status / created_at はサーバーが付与する）
export type InquiryCreateInput = {
  title: string
  content: string
  requester: string
}

// ステータス更新で送るデータ
export type InquiryStatusUpdateInput = {
  status: InquiryStatus
}

//内容更新データ
export type UpdateInquiryInput = {
  title?:string,
  content?:string,
  status?:InquiryStatus
}