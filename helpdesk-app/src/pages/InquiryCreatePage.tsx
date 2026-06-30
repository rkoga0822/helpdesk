import { useForm } from "react-hook-form";
import type { InquiryCreateInput } from "../types/inquiry";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCreateInquiry } from "../hooks/useCreateInquiry";
import axios from "axios";

type LaravelValidationError = {
  message: string;
  errors: Record<string, string[]>;
};

type InquiryCreatePageProps = {
  onCreated: () => void;
  onBack: () => void;
};

// 新規登録フォーム。React Hook Form で入力を管理し、POST /api/inquiries で作成する
export function InquiryCreatePage({
  onCreated,
  onBack,
}: InquiryCreatePageProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InquiryCreateInput>();
  const { mutateAsync: createInquiry, isPending } = useCreateInquiry();

  const onSubmit = async (data: InquiryCreateInput) => {
    try {
      await createInquiry(data);
      onCreated();
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 422) {
        const body = e.response.data as LaravelValidationError;

        Object.entries(body.errors).forEach(([field, messages]) => {
          setError(field as keyof InquiryCreateInput, {
            type: "server",
            message: messages[0],
          });
        });
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 8,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 600,
          borderRadius: 2,
        }}
      >
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 2 }}>
          一覧へ戻る
        </Button>

        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          新規問い合わせ
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              label="タイトル"
              required
              fullWidth
              placeholder="例：ログインできない"
              error={!!errors.title}
              helperText={errors.title?.message}
              {...register("title", {
                required: "タイトルを入力してください",
                maxLength: {
                  value: 100,
                  message: "100文字以内で入力してください",
                },
              })}
            />

            <TextField
              label="内容"
              required
              fullWidth
              multiline
              rows={4}
              placeholder="問題の詳細を入力してください"
              error={!!errors.content}
              helperText={errors.content?.message}
              {...register("content", {
                required: "内容を入力してください",
                maxLength: {
                  value: 1000,
                  message: "1000文字以内で入力してください",
                },
              })}
            />

            <TextField
              label="投稿者名"
              required
              fullWidth
              placeholder="例：山田太郎"
              error={!!errors.requester}
              helperText={errors.requester?.message}
              {...register("requester", {
                required: "投稿者名を入力してください",
                maxLength: {
                  value: 100,
                  message: "100文字以内で入力してください",
                },
              })}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting || isPending}
            >
              {isSubmitting || isPending ? "送信中..." : "登録する"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
