import type { Inquiry } from '../types/inquiry'
import { InquiryTable } from '../components/InquiryTable'
import { StatusFilter } from '../components/StatusFilter'
import {
  Box,
  Typography,
  Paper,
} from "@mui/material";
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
  <Box
    sx={{
      maxWidth: 800,
      mx: "auto",
      mt: 3,
      px: 2,
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        mb: 2,
      }}
    >
      問い合わせ一覧（{inquiries.length} 件）
    </Typography>


    <Paper
      sx={{
        p: 2,
        mb: 2,
      }}
    >
      <StatusFilter
        current={filter}
        onChange={onChangeFilter}
        counts={{
          all: inquiries.length,
        }}
      />
    </Paper>


    {isLoading && (
      <Typography color="text.secondary">
        読み込み中...
      </Typography>
    )}


    {error && (
      <Typography color="error">
        {error}
      </Typography>
    )}


    {!isLoading &&
      !error &&
      (inquiries.length === 0 ? (
        <Typography color="text.secondary">
          該当する問い合わせはありません。
        </Typography>
      ) : (
        <Paper>
          <InquiryTable
            inquiries={inquiries}
            onSelect={onSelectInquiry}
          />
        </Paper>
      ))}
  </Box>
)
}
