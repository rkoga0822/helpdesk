import { useForm } from "react-hook-form";
import axios from "axios";
import type { LoginInput, User } from "../types/auth";
import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type LaravelValidationError = {
  errors: Record<string, string[]>;
};

type LoginFormProps = {
  onLogin: (input: LoginInput) => Promise<User>;
  onSwitchToRegister: () => void;
};

export function LoginForm({ onLogin, onSwitchToRegister }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>();

  const onSubmit = async (data: LoginInput) => {
    try {
      await onLogin(data);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 422) {
        const body = e.response.data as LaravelValidationError;
        Object.entries(body.errors).forEach(([field, messages]) => {
          setError(field as keyof LoginInput, {
            type: "server",
            message: messages[0],
          });
        });
      }
    }
  };

  return (
  <Paper
    elevation={2}
    sx={{
      p: 4,
      width: "100%",
      maxWidth: 400,
    }}
  >
    <Typography
      variant="h5"
      sx={{ fontWeight: 700, mb: 3 }}
    >
      ログイン
    </Typography>

    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>

        <TextField
          label="メールアドレス"
          type="email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email", {
            required:
              "メールアドレスを入力してください",
          })}
        />


        <TextField
          label="パスワード"
          type="password"
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password", {
            required:
              "パスワードを入力してください",
          })}
        />


        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "ログイン中..."
            : "ログイン"}
        </Button>


        <Button
          type="button"
          variant="outlined"
          onClick={onSwitchToRegister}
        >
          新規登録
        </Button>

      </Stack>
    </form>
  </Paper>
);
}
