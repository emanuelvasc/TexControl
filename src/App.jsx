import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import "./styles/global.css"; // ← Adicione esta linha

export default function App() {
  const [page, setPage] = useState("landing");
  const [dashPage, setDashPage] = useState("dashboard");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      setLoginError("Preencha todos os campos.");
      return;
    }
    setLoginError("");
    setPage("dashboard");
    setDashPage("dashboard");
  };

  if (page === "login") {
    return (
      <LoginPage
        loginData={loginData}
        setLoginData={setLoginData}
        onLogin={handleLogin}
        loginError={loginError}
        onBack={() => setPage("landing")}
      />
    );
  }
  if (page === "dashboard") {
    return (
      <DashboardPage
        dashPage={dashPage}
        setDashPage={setDashPage}
        onLogout={() => setPage("landing")}
      />
    );
  }
  return <LandingPage onLogin={() => setPage("login")} />;
}
