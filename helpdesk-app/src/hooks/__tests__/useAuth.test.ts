import { renderHook, act, waitFor } from "@testing-library/react";
import { useAuth } from "../useAuth";

vi.mock("../../api/auth", () => ({
  authApi: {
    me: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
  },
}));

import { authApi } from "../../api/auth";

// 各テスト前に localStorage と mock をリセット
console.log('window.localStorage', window.localStorage)
console.log('globalThis.localStorage', globalThis.localStorage)
console.log('constructor', localStorage?.constructor?.name)
// beforeEach(() => {
//   localStorage.clear();
//   vi.clearAllMocks();
// });

beforeEach(() => {
  const store: Record<string, string> = {}

  vi.stubGlobal('localStorage', {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach(key => delete store[key])
    }),
  })

  vi.clearAllMocks()
})

describe("useAuth", () => {
  it("トークンがない場合、isLoggedIn は false", async () => {
    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it("有効なトークンがある場合、ユーザー情報が取得される", async () => {
    const mockUser = { id: 1, name: "テスト", email: "test@example.com" };
    vi.mocked(authApi.me).mockResolvedValue(mockUser);
    localStorage.setItem("auth_token", "valid-token");

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoggedIn).toBe(true);
    });

    expect(result.current.user).toEqual(mockUser);
  });

  it("トークンが無効な場合、isLoggedIn は false", async () => {
    vi.mocked(authApi.me).mockRejectedValue(new Error("401"));
    localStorage.setItem("auth_token", "invalid-token");

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isLoggedIn).toBe(false);
  });

  it("login() を呼ぶとユーザーがセットされる", async () => {
    const mockUser = { id: 1, name: "テスト", email: "test@example.com" };
    vi.mocked(authApi.me).mockRejectedValue(new Error("no token"));
    vi.mocked(authApi.login).mockResolvedValue({
      user: mockUser,
      token: "new-token",
    });

    const { result } = renderHook(() => useAuth());

    // 初期ロード完了を待つ
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // login() を呼ぶ
    await act(async () => {
      await result.current.login({
        email: "test@example.com",
        password: "password123",
      });
    });

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user).toEqual(mockUser);
    expect(localStorage.getItem("auth_token")).toBe("new-token");
  });
});
