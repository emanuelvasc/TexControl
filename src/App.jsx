import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardClientPage from "./pages/DashboardClientPage";
import "./styles/global.css";

export default function App() {
  const [page, setPage] = useState("landing");
  const [dashPage, setDashPage] = useState("dashboard");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      setLoginError("Preencha todos os campos.");
      return;
    }

    const storedUser = localStorage.getItem(`user_${loginData.email}`);
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === loginData.password) {
        setLoginError("");
        setUserData(user);
        setUserType(user.userType);
        
        if (user.userType === "admin") {
          setPage("dashboard");
          setDashPage("dashboard");
        } else {
          setPage("client-dashboard");
        }
        return;
      }
    }
    
    if (loginData.email === "admin@texcontrol.com" && loginData.password === "123456") {
      setLoginError("");
      setUserType("admin");
      setUserData({ name: "Administrador", email: "admin@texcontrol.com", userType: "admin" });
      setPage("dashboard");
      setDashPage("dashboard");
      return;
    }
    
    setLoginError("E-mail ou senha inválidos.");
  };

  const handleSignup = (email, password, type) => {
    setLoginData({ email, password });
    setUserType(type);
    setPage("login");
  };

  if (page === "login") {
    return (
      <LoginPage
        loginData={loginData}
        setLoginData={setLoginData}
        onLogin={handleLogin}
        onSignup={() => setPage("signup")}
        loginError={loginError}
        onBack={() => setPage("landing")}
      />
    );
  }
  
  if (page === "signup") {
    return (
      <SignupPage
        onSignup={handleSignup}
        onBack={() => setPage("landing")}
        signupError={signupError}
      />
    );
  }
  
  if (page === "dashboard") {
    return (
      <DashboardPage
        dashPage={dashPage}
        setDashPage={setDashPage}
        onLogout={() => {
          setPage("landing");
          setLoginData({ email: "", password: "" });
          setUserData(null);
          setUserType(null);
        }}
        userData={userData}
      />
    );
  }
  
  if (page === "client-dashboard") {
    return (
      <DashboardClientPage
        onLogout={() => {
          setPage("landing");
          setLoginData({ email: "", password: "" });
          setUserData(null);
          setUserType(null);
        }}
        userData={userData}
      />
    );
  }
  
  return <LandingPage onLogin={() => setPage("login")} />;
}