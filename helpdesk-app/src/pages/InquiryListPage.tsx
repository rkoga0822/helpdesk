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
      <h2 className="text-lg font-bold text-gray-800 mb-4">問い合わせ一覧（{inquiries.length} 件）</h2>

      <StatusFilter
        current={filter}
        onChange={onChangeFilter}
        counts={{ all: inquiries.length }}
      />

      {isLoading && <p className="text-sm text-gray-500">読み込み中...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {!isLoading && !error &&
        (inquiries.length === 0 ? (
          <p className="text-sm text-gray-500">該当する問い合わせはありません。</p>
        ) : (
          <InquiryTable inquiries={inquiries} onSelect={onSelectInquiry} />
        ))}
    </div>
  )
}
