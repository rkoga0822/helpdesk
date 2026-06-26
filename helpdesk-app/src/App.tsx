import { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { useAuth } from "./hooks/useAuth";
import { RegisterForm } from "./components/RegisterForm";
import { InquiryPage } from "./pages/InquiryPage";


function App() {
  const { user, isLoggedIn, isLoading, login, logout, register } = useAuth();

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
