// src/pages/ResetPasswordPage.jsx
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";

const ResetPasswordPage = ({ onBack }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Verificar se o token é válido
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setError("Link inválido ou expirado. Solicite uma nova recuperação.");
      }
    };
    checkSession();
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage("✅ Senha alterada com sucesso! Você já pode fazer login com sua nova senha.");
        setTimeout(() => {
          onBack();
        }, 3000);
      }
    } catch (error) {
      setError("Erro ao alterar senha. Tente novamente.");
    }

    setIsLoading(false);
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
              REDEFINIR
              <br />
              SUA SENHA
              <br />
              <em>COM SEGURANÇA</em>
            </div>
          </div>
          <div className="login-copyright">© 2025 TEXCONTROL</div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-wrap fade-in">
          <button className="btn-back" onClick={onBack}>
            <Icon d="M19 12H5 M12 19l-7-7 7-7" size={14} /> VOLTAR AO LOGIN
          </button>

          <h1 className="login-title">NOVA SENHA</h1>
          <p className="login-sub">
            Digite sua nova senha abaixo.
          </p>

          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label className="form-label">Nova Senha</label>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
                required
              />
            </div>

            {message && <div className="success-message">{message}</div>}
            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="btn-login-full" disabled={isLoading}>
              {isLoading ? "ALTERANDO..." : "ALTERAR SENHA"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;