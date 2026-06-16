// src/pages/LoginPage.jsx
import { useState } from "react";
import Icon from "../components/Icon";

const LoginPage = ({
  loginData,
  setLoginData,
  onLogin,
  onSignup,
  loginError,
  onBack,
}) => {
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
              className="signup-link"
              onClick={(e) => {
                e.preventDefault();
                if (onSignup) onSignup();
              }}
            >
              Criar conta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;