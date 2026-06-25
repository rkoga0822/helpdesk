import { useForm } from "react-hook-form";
import axios from "axios";
import type { LoginInput, User } from "../types/auth";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>ログイン</h2>

      <div>
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "メールアドレスを入力してください",
          })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">パスワード</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "パスワードを入力してください",
          })}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "ログイン中..." : "ログイン"}
      </button>

      <button type="button" onClick={onSwitchToRegister}>
        新規登録
      </button>
    </form>
  );
}
