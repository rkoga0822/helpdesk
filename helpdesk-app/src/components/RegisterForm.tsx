import { useForm } from "react-hook-form";
import type { RegisterInput } from "../types/auth";
import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

type RegisterFormProps = {
  onRegister: (input: RegisterInput) => Promise<unknown>;
  onSwitchToLogin: () => void;
};

type LaravelValidationError = {
  errors:Record<string,string[]>
}

export function RegisterForm({
  onRegister,
  onSwitchToLogin,
}: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>();
  const password = watch("password", "");

  const onSubmit = async (data: RegisterInput) => {
    try{
      await onRegister(data)
    }catch(e){
      if(axios.isAxiosError(e) && e.response?.status === 422){
        const body = e.response.data as LaravelValidationError

        Object.entries(body.errors).forEach(([field,messages])=>{
          setError(field as keyof RegisterInput,{
            type:"server",
            message:messages[0]
          })
        })
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
      sx={{
        fontWeight: 700,
        mb: 3,
      }}
    >
      アカウント作成
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
          label="名前"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register("name", {
            required:
              "名前を入力してください",
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


        <TextField
          label="パスワード確認"
          type="password"
          fullWidth
          error={!!errors.password_confirmation}
          helperText={
            errors.password_confirmation?.message
          }
          {...register("password_confirmation", {
            required:
              "確認用パスワードを入力してください",

            validate: (value) =>
              value === password ||
              "パスワードが一致しません",
          })}
        />


        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "登録中..."
            : "登録する"}
        </Button>


        <Button
          type="button"
          variant="outlined"
          onClick={onSwitchToLogin}
        >
          ログインに戻る
        </Button>

      </Stack>
    </form>

  </Paper>
);
}
