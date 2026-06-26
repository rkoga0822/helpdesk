import type { Inquiry, InquiryStatus } from "../types/inquiry";
import { StatusBadge } from "../components/StatusBadge";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";

type InquiryDetailPageProps = {
  inquiry: Inquiry;
  onBack: () => void;
  onUpdateStatus: (id: number, status: InquiryStatus) => void;
  onDelete: (id: number) => void;
  onEdit: () => void;
};

// 詳細ページ。表示とユーザー操作の通知だけを担当し、API 呼び出しは App 側に置く
export function InquiryDetailPage({
  inquiry,
  onBack,
  onUpdateStatus,
  onDelete,
  onEdit,
}: InquiryDetailPageProps) {
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            sx={{ alignSelf: "flex-start" }}
          >
            一覧へ戻る
          </Button>

          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {inquiry.title}
          </Typography>

          <StatusBadge status={inquiry.status} />

          <Typography color="text.secondary">
            投稿者：{inquiry.requester}
          </Typography>

          <Typography
            sx={{
              whiteSpace: "pre-wrap",
            }}
          >
            内容：{inquiry.content}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            投稿日時：{inquiry.created_at}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => onDelete(inquiry.id)}
            >
              削除
            </Button>

            <Button variant="contained" onClick={onEdit}>
              編集
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
