import { useState } from "react";
import Icon from "../components/Icon";

const LoginPage = ({
  loginData,
  setLoginData,
  onLogin,
  onSignup, // nova prop
  loginError,
  onBack,
}) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResetError("");
    setResetMessage("");

    if (!resetEmail) {
      setResetError("Digite seu e-mail para recuperar a senha.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const storedUser = localStorage.getItem(`user_${resetEmail}`);
      
      if (storedUser || resetEmail === "admin@texcontrol.com" || resetEmail === "teste@teste.com") {
        const code = generateCode();
        localStorage.setItem(`reset_code_${resetEmail}`, code);
        localStorage.setItem(`reset_expires_${resetEmail}`, Date.now() + 300000);
        
        setResetMessage(`✅ Código enviado! (Simulação: ${code})`);
        setStep(2);
      } else {
        setResetError("E-mail não encontrado no sistema.");
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResetError("");
    setResetMessage("");

    const savedCode = localStorage.getItem(`reset_code_${resetEmail}`);
    const expires = localStorage.getItem(`reset_expires_${resetEmail}`);
    
    if (!savedCode || !expires) {
      setResetError("Nenhuma solicitação de recuperação ativa.");
      setIsLoading(false);
      return;
    }

    if (Date.now() > parseInt(expires)) {
      setResetError("Código expirado. Solicite um novo código.");
      localStorage.removeItem(`reset_code_${resetEmail}`);
      localStorage.removeItem(`reset_expires_${resetEmail}`);
      setIsLoading(false);
      return;
    }

    if (resetCode === savedCode) {
      setResetMessage("✅ Código verificado! Digite sua nova senha.");
      setStep(3);
    } else {
      setResetError("Código inválido. Tente novamente.");
    }
    setIsLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResetError("");
    setResetMessage("");

    if (newPassword.length < 6) {
      setResetError("A senha deve ter pelo menos 6 caracteres.");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const storedUser = localStorage.getItem(`user_${resetEmail}`);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        user.password = newPassword;
        localStorage.setItem(`user_${resetEmail}`, JSON.stringify(user));
      }
      
      localStorage.removeItem(`reset_code_${resetEmail}`);
      localStorage.removeItem(`reset_expires_${resetEmail}`);
      
      setResetMessage("✅ Senha alterada com sucesso! Faça login.");
      
      setTimeout(() => {
        setShowForgotPassword(false);
        setStep(1);
        setResetEmail("");
        setResetCode("");
        setNewPassword("");
        setConfirmPassword("");
        setResetMessage("");
        setLoginData({ email: resetEmail, password: newPassword });
      }, 2000);
      
      setIsLoading(false);
    }, 1500);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setStep(1);
    setResetEmail("");
    setResetCode("");
    setNewPassword("");
    setConfirmPassword("");
    setResetMessage("");
    setResetError("");
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-left-content">
          <div className="login-brand">
            <div className="logo-mark">T</div>
            <span>TEXCONTROL</span>
          </div>
          <div>
            <div className="login-tagline">
              CONTROLE
              <br />
              TOTAL
              <br />
              <em>DA PRODUÇÃO</em>
            </div>
          </div>
          <div className="login-copyright">© 2026 TEXCONTROL</div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-wrap fade-in">
          
          {!showForgotPassword ? (
            <>
              <button className="btn-back" onClick={onBack}>
                <Icon d="M19 12H5 M12 19l-7-7 7-7" size={14} /> VOLTAR
              </button>

              <h1 className="login-title">ENTRAR</h1>
              <p className="login-sub">
                Acesse o painel de controle da sua confecção.
              </p>

              <div className="form-group">
                <label className="form-label">E-mail</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="seu@email.com"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData((d) => ({ ...d, email: e.target.value }))
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Senha</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData((d) => ({ ...d, password: e.target.value }))
                  }
                  onKeyDown={(e) => e.key === "Enter" && onLogin()}
                />
              </div>

              {loginError && <div className="login-error">{loginError}</div>}

              <button className="btn-login-full" onClick={onLogin}>
                ACESSAR SISTEMA
              </button>

              <div className="login-footer-links">
                <a 
                  href="#" 
                  className="forgot-password-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowForgotPassword(true);
                  }}
                >
                  Esqueceu a senha?
                </a>
                <span className="separator">|</span>
                <a 
                  href="#" 
                  className="signup-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onSignup) onSignup();
                  }}
                >
                  Criar conta
                </a>
              </div>

             
            </>
          ) : (
            <>
              <button className="btn-back" onClick={handleBackToLogin}>
                <Icon d="M19 12H5 M12 19l-7-7 7-7" size={14} /> VOLTAR AO LOGIN
              </button>

              <h1 className="login-title">RECUPERAR SENHA</h1>
              
              {step === 1 && (
                <>
                  <p className="login-sub">
                    Digite seu e-mail para receber o código de recuperação.
                  </p>

                  <div className="form-group">
                    <label className="form-label">E-mail</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="seu@email.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="login-sub">
                    Digite o código de 6 dígitos enviado para <strong>{resetEmail}</strong>
                  </p>

                  <div className="form-group">
                    <label className="form-label">Código de Verificação</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="000000"
                      maxLength="6"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>

                  <div className="resend-code">
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        handleSendCode(e);
                      }}
                    >
                      Reenviar código
                    </a>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <p className="login-sub">
                    Digite sua nova senha para <strong>{resetEmail}</strong>
                  </p>

                  <div className="form-group">
                    <label className="form-label">Nova Senha</label>
                    <input
                      className="form-input"
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Confirmar Senha</label>
                    <input
                      className="form-input"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </>
              )}

              {resetMessage && <div className="success-message">{resetMessage}</div>}
              {resetError && <div className="login-error">{resetError}</div>}

              <button 
                className="btn-login-full" 
                onClick={step === 1 ? handleSendCode : step === 2 ? handleVerifyCode : handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? "Processando..." : step === 1 ? "ENVIAR CÓDIGO" : step === 2 ? "VERIFICAR CÓDIGO" : "ALTERAR SENHA"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;