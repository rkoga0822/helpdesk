import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { api } from "../lib/api";
import type { AuthResponse, LoginInput, RegisterInput, User } from "../types/auth";

const TOKEN_KEY = "auth_token";
const authQueryKey = ["auth", "me"] as const;

export function useAuth() {
  const queryClient = useQueryClient();
  const hasToken = localStorage.getItem(TOKEN_KEY) !== null;

  const saveSession = ({ user, token }: AuthResponse) => {
    localStorage.setItem(TOKEN_KEY, token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    queryClient.setQueryData(authQueryKey, user);
    return user;
  };

  const clearSession = () => {
    localStorage.removeItem(TOKEN_KEY);
    delete api.defaults.headers.common["Authorization"];
    queryClient.setQueryData(authQueryKey, null);
    queryClient.removeQueries({ queryKey: ["inquiries"] });
  };

  const meQuery = useQuery<User | null>({
    queryKey: authQueryKey,
    queryFn: authApi.me,
    enabled: hasToken,
    retry: false,
    initialData: hasToken ? undefined : null,
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: saveSession,
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: saveSession,
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSettled: clearSession,
  });

  const user = meQuery.data ?? null;
  const isLoggedIn = user !== null;
  const isLoading = hasToken && meQuery.isPending;

  const login = async (input: LoginInput) => {
    const { user } = await loginMutation.mutateAsync(input);
    return user;
  };
  const register = async (input: RegisterInput) => {
    const { user } = await registerMutation.mutateAsync(input);
    return user;
  };
  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return { user, isLoggedIn, isLoading, login, logout, register };
}
