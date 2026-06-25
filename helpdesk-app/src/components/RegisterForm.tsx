import { useForm } from "react-hook-form";
import type { RegisterInput } from "../types/auth";

type RegisterFormProps = {
  onRegister: (input: RegisterInput) => Promise<unknown>;
  onSwitchToLogin: () => void;
};

export function RegisterForm({
  onRegister,
  onSwitchToLogin,
}: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>();
  const password = watch("password", "");

  const onSubmit = async (data: RegisterInput) => {
    await onRegister(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>アカウント作成</h2>
      <div>
        <label>メールアドレス</label>
        <input
          type="email"
          {...register("email", {
            required: "メールアドレスを入力してください",
          })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <div>
        <label>名前</label>
        <input
          type="name"
          {...register("name", {
            required: "名前を入力してください",
          })}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
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

      <div>
        <label>パスワード確認</label>
        <input
          type="password"
          {...register("password_confirmation", {
            required: "確認用パスワードを入力してください",
            validate: (value) =>
              value === password || "パスワードが一致しません",
          })}
        />
        {errors.password_confirmation && (
          <p style={{ color: "red" }}>{errors.password_confirmation.message}</p>
        )}
      </div>
      {/* password_confirmation は watch('password') と一致チェック */}
      <button type="submit" disabled={isSubmitting}>
        登録する
      </button>
      <button type="button" onClick={onSwitchToLogin}>
        ログインに戻る
      </button>
    </form>
  );
}
