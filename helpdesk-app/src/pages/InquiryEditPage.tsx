import { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import Stack from "@mui/material/Stack";

import { inquiryApi } from "../api/inquiries";
import type {
  Inquiry,
  InquiryStatus,
} from "../types/inquiry";

type InquiryEditPageProps = {
  inquiry: Inquiry;
  onBack: () => void;
  onUpdated: (inquiry: Inquiry) => void;
};

export const InquiryEditPage = ({
  inquiry,
  onBack,
  onUpdated,
}: InquiryEditPageProps) => {
  const [title, setTitle] = useState(inquiry.title);
  const [content, setContent] = useState(inquiry.content);
  const [status, setStatus] = useState(inquiry.status);

  const handleSubmit = async () => {
    const updated = await inquiryApi.update(inquiry.id, {
      title,
      content,
      status,
    });

    onUpdated(updated);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 4,
        p: 4,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: "bold",
        }}
      >
        問い合わせ編集
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="タイトル"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="内容"
          fullWidth
          multiline
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <TextField
          select
          label="ステータス"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value as InquiryStatus)}
        >
          <MenuItem value="pending">未対応</MenuItem>

          <MenuItem value="in_progress">対応中</MenuItem>

          <MenuItem value="completed">完了</MenuItem>
        </TextField>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button variant="outlined" onClick={onBack}>
            戻る
          </Button>

          <Button variant="contained" onClick={handleSubmit}>
            保存
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
