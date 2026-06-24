import type { Inquiry } from '../types/inquiry'
import { InquiryTable } from '../components/InquiryTable'
import { StatusFilter } from '../components/StatusFilter'

type InquiryListPageProps = {
  inquiries: Inquiry[]
  filter: string
  onChangeFilter: (status: string) => void
  isLoading: boolean
  error: string | null
  onSelectInquiry: (id: number) => void
}

// 一覧ページ。useInquiries の値を Props で受け取り、フィルタとテーブルを表示する
export function InquiryListPage({
  inquiries,
  filter,
  onChangeFilter,
  isLoading,
  error,
  onSelectInquiry,
}: InquiryListPageProps) {
  return (
    <div>
      <h2>問い合わせ一覧（{inquiries.length} 件）</h2>

      <StatusFilter
        current={filter}
        onChange={onChangeFilter}
        counts={{ all: inquiries.length }}
      />

      {isLoading && <p>読み込み中...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading && !error &&
        (inquiries.length === 0 ? (
          <p>該当する問い合わせはありません。</p>
        ) : (
          <InquiryTable inquiries={inquiries} onSelect={onSelectInquiry} />
        ))}
    </div>
  )
}
