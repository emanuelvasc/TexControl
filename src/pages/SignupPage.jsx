import { useState } from "react";
import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";

const SignupPage = ({ onSignup, onBack, signupError }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
    userType: "client", // "admin" ou "client"
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (formData.name.length < 3) {
      newErrors.name = "Nome deve ter pelo menos 3 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    if (!agreeTerms) {
      newErrors.terms = "Você precisa aceitar os termos de uso";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const existingUser = localStorage.getItem(`user_${formData.email}`);
      if (existingUser) {
        setErrors({ email: "Este e-mail já está cadastrado" });
        setIsLoading(false);
        return;
      }

      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
        company: formData.company,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem(`user_${formData.email}`, JSON.stringify(userData));
      
      setIsLoading(false);
      onSignup(formData.email, formData.password, formData.userType);
    }, 1500);
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
              CADASTRE-SE
              <br />
              E COMECE A
              <br />
              <em>CONTROLAR</em>
            </div>
          </div>
          <div className="login-copyright">© 2025 TEXCONTROL</div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-wrap fade-in">
          <button className="btn-back" onClick={onBack}>
            <Icon d="M19 12H5 M12 19l-7-7 7-7" size={14} /> VOLTAR
          </button>

          <h1 className="login-title">CRIAR CONTA</h1>
          <p className="login-sub">
            Preencha os dados abaixo para começar.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nome completo *</label>
              <input
                className={`form-input ${errors.name ? "error" : ""}`}
                type="text"
                placeholder="Seu nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <span className="input-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">E-mail *</label>
              <input
                className={`form-input ${errors.email ? "error" : ""}`}
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <span className="input-error">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label className="form-label">Senha *</label>
                <div className="password-wrapper">
                  <input
                    className={`form-input ${errors.password ? "error" : ""}`}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon d={showPassword ? ICONS.eyeOff : ICONS.eye} size={18} />
                  </button>
                </div>
                {errors.password && <span className="input-error">{errors.password}</span>}
              </div>

              <div className="form-group half">
                <label className="form-label">Confirmar senha *</label>
                <input
                  className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                {errors.confirmPassword && <span className="input-error">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Tipo de conta *</label>
              <select
                className="form-input"
                value={formData.userType}
                onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
              >
                <option value="client">Cliente - Acesso a pedidos e acompanhamento</option>
                <option value="admin">Administrador - Acesso total ao sistema</option>
              </select>
              <p className="field-note">Administrador: acesso ao painel de gestão completo</p>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label className="form-label">Empresa</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Nome da sua empresa"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="form-group half">
                <label className="form-label">Telefone</label>
                <input
                  className="form-input"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group terms-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>Li e aceito os <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a></span>
              </label>
              {errors.terms && <span className="input-error">{errors.terms}</span>}
            </div>

            {signupError && <div className="login-error">{signupError}</div>}

            <button type="submit" className="btn-login-full" disabled={isLoading}>
              {isLoading ? "CADASTRANDO..." : "CRIAR CONTA"}
            </button>

            <p className="login-note">
              Já tem uma conta? <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>Faça login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;