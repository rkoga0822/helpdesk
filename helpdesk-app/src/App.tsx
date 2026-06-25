import { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { InquiryListPage } from "./pages/InquiryListPage";
import { InquiryDetailPage } from "./pages/InquiryDetailPage";
import { InquiryCreatePage } from "./pages/InquiryCreatePage";
import { useAuth } from "./hooks/useAuth";
import { useInquiries } from "./hooks/useInquiries";
import { inquiryApi } from "./api/inquiries";
import type { User } from "./types/auth";
import type { Inquiry, InquiryStatus } from "./types/inquiry";
import axios from "axios";
import { RegisterForm } from "./components/RegisterForm";

type Page = "list" | "detail" | "create";

type InquiryPageProps = {
  user: User;
  onLogout: () => void;
};

function InquiryPage({ user, onLogout }: InquiryPageProps) {
  const {
    inquiries,
    filter,
    setFilter,
    isLoading,
    error,
    addInquiry,
    updateInquiry,
    removeInquiry,
  } = useInquiries();

  const [currentPage, setCurrentPage] = useState<Page>("list");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelectInquiry = (id: number) => {
    setSelectedId(id);
    setCurrentPage("detail");
  };
  const handleBack = () => {
    setSelectedId(null);
    setCurrentPage("list");
  };
  const handleCreated = (inquiry: Inquiry) => {
    addInquiry(inquiry);
    setCurrentPage("list");
  };

  const handleUpdateStatus = async (id: number, status: InquiryStatus) => {
    const updated = await inquiryApi.updateStatus(id, status);
    updateInquiry(updated);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("この問い合わせを削除しますか？")) return;
    try {
      await inquiryApi.delete(id);
      removeInquiry(id);
      handleBack();
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 403) {
        alert("削除には管理者権限が必要です");
      }
    }
  };

  const selectedInquiry = inquiries.find((i) => i.id === selectedId);

  return (
    <div>
      <header>
        <h1>問い合わせ管理</h1>
        <span>{user.name}</span>
        <button onClick={onLogout}>ログアウト</button>
        <nav>
          <button onClick={() => setCurrentPage("list")}>一覧</button>
          <button onClick={() => setCurrentPage("create")}>新規登録</button>
        </nav>
      </header>

      <main>
        {currentPage === "list" && (
          <InquiryListPage
            inquiries={inquiries}
            filter={filter}
            onChangeFilter={setFilter}
            isLoading={isLoading}
            error={error}
            onSelectInquiry={handleSelectInquiry}
          />
        )}
        {currentPage === "detail" && selectedInquiry && (
          <InquiryDetailPage
            inquiry={selectedInquiry}
            onBack={handleBack}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDelete}
          />
        )}
        {currentPage === "create" && (
          <InquiryCreatePage onCreated={handleCreated} onBack={handleBack} />
        )}
      </main>
    </div>
  );
}

function App() {
  const { user, isLoggedIn, isLoading, login, logout,register } = useAuth();

  type AuthPage = "login" | "register";

  const [authPage, setAuthPage] = useState<AuthPage>("login");

  if (isLoading) return <p>読み込み中...</p>;
  if (!isLoggedIn) {
    if (authPage === "login") {
      return (
        <LoginForm
          onLogin={login}
          onSwitchToRegister={() => setAuthPage("register")}
        />
      );
    }

    return (
      <RegisterForm
        onRegister={register}
        onSwitchToLogin={() => setAuthPage("login")}
      />
    );
  }
  return <InquiryPage user={user!} onLogout={logout} />;
}

export default App;
