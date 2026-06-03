// src/pages/SettingsPage.jsx
import { useState, useEffect } from "react";
import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";

const SettingsPage = ({ userData, onUpdateUser, userType = "admin" }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Dados do perfil
  const [profileData, setProfileData] = useState({
    name: userData?.name || (userType === "admin" ? "Administrador" : "Cliente"),
    email: userData?.email || (userType === "admin" ? "admin@texcontrol.com" : "cliente@email.com"),
    company: userData?.company || "",
    phone: userData?.phone || "",
  });

  // Configurações de notificação
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    orderUpdates: true,
    productionAlerts: true,
    stockAlerts: false,
    marketingEmails: false,
  });

  // Configurações de tema
  const [theme, setTheme] = useState(localStorage.getItem("user_theme") || "dark");

  // Aplicar tema ao body
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
    localStorage.setItem("user_theme", theme);
  }, [theme]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (onUpdateUser) {
        onUpdateUser(profileData);
      }
      localStorage.setItem(`user_${profileData.email}`, JSON.stringify(profileData));
      showMessage("success", "Perfil atualizado com sucesso!");
      setIsLoading(false);
    }, 1000);
  };

  const handleSaveNotifications = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("user_notifications", JSON.stringify(notifications));
      showMessage("success", "Preferências de notificação salvas!");
      setIsLoading(false);
    }, 500);
  };

  const handleSaveTheme = (newTheme) => {
    setTheme(newTheme);
    showMessage("success", `Tema alterado para ${newTheme === "dark" ? "Escuro" : "Claro"}!`);
  };

  const tabs = [
    { id: "profile", label: "Perfil", icon: ICONS.users },
    { id: "notifications", label: "Notificações", icon: ICONS.bell },
    { id: "security", label: "Segurança", icon: ICONS.lock },
    { id: "preferences", label: "Preferências", icon: ICONS.settings },
  ];

  // Se for cliente, remove a aba de segurança
  const visibleTabs = userType === "client" 
    ? tabs.filter(tab => tab.id !== "security")
    : tabs;

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Configurações</h1>
          <p className="page-subtitle">Gerencie suas preferências e dados da conta</p>
        </div>
      </div>

      {message.text && (
        <div className={`settings-message ${message.type}`}>
          {message.type === "success" ? "✅" : "❌"} {message.text}
        </div>
      )}

      <div className="settings-container">
        <div className="settings-sidebar">
          {visibleTabs.map((tab) => (
            <div
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon d={tab.icon} size={18} />
              <span>{tab.label}</span>
            </div>
          ))}
        </div>

        <div className="settings-content">
          {/* ABA PERFIL */}
          {activeTab === "profile" && (
            <div className="settings-card">
              <h3>Informações do Perfil</h3>
              <form onSubmit={handleSaveProfile}>
                <div className="form-row">
                  <div className="form-group half">
                    <label className="form-label">Nome completo</label>
                    <input
                      type="text"
                      className="form-input"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group half">
                    <label className="form-label">E-mail</label>
                    <input
                      type="email"
                      className="form-input"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label className="form-label">Empresa</label>
                    <input
                      type="text"
                      className="form-input"
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    />
                  </div>
                  <div className="form-group half">
                    <label className="form-label">Telefone</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-save" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar alterações"}
                </button>
              </form>
            </div>
          )}

          {/* ABA NOTIFICAÇÕES */}
          {activeTab === "notifications" && (
            <div className="settings-card">
              <h3>Preferências de Notificação</h3>
              <div className="notifications-list">
                <div className="notification-item">
                  <div className="notification-info">
                    <Icon d={ICONS.mail} size={18} />
                    <div>
                      <strong>Alertas por e-mail</strong>
                      <p>Receba notificações importantes por e-mail</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.emailAlerts}
                      onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <Icon d={ICONS.orders} size={18} />
                    <div>
                      <strong>Atualizações de pedidos</strong>
                      <p>Notificar quando houver mudanças nos pedidos</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.orderUpdates}
                      onChange={(e) => setNotifications({ ...notifications, orderUpdates: e.target.checked })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <Icon d={ICONS.production} size={18} />
                    <div>
                      <strong>Alertas de produção</strong>
                      <p>Notificar sobre status da produção</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.productionAlerts}
                      onChange={(e) => setNotifications({ ...notifications, productionAlerts: e.target.checked })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <Icon d={ICONS.stock} size={18} />
                    <div>
                      <strong>Alertas de estoque</strong>
                      <p>Notificar quando estoque estiver baixo</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.stockAlerts}
                      onChange={(e) => setNotifications({ ...notifications, stockAlerts: e.target.checked })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <button className="btn-save" onClick={handleSaveNotifications} disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar preferências"}
              </button>
            </div>
          )}

          {/* ABA SEGURANÇA */}
          {activeTab === "security" && userType !== "client" && (
            <div className="settings-card">
              <h3>Alterar Senha</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                showMessage("success", "Senha alterada com sucesso!");
              }}>
                <div className="form-group">
                  <label className="form-label">Senha atual</label>
                  <input type="password" className="form-input" placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label className="form-label">Nova senha</label>
                  <input type="password" className="form-input" placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirmar nova senha</label>
                  <input type="password" className="form-input" placeholder="••••••••" />
                </div>
                <button type="submit" className="btn-save">Alterar senha</button>
              </form>

              <div className="security-divider">
                <span>Sessões ativas</span>
              </div>

              <div className="sessions-list">
                <div className="session-item">
                  <div>
                    <Icon d={ICONS.chart} size={16} />
                    <strong>Este dispositivo</strong>
                    <p>Chrome - Windows • São Paulo, SP</p>
                  </div>
                  <span className="session-current">Atual</span>
                </div>
              </div>
            </div>
          )}

          {/* ABA PREFERÊNCIAS - APENAS TEMA */}
          {activeTab === "preferences" && (
            <div className="settings-card">
              <h3>Aparência</h3>
              <div className="theme-options">
                <div 
                  className={`theme-option ${theme === "dark" ? "active" : ""}`}
                  onClick={() => handleSaveTheme("dark")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="theme-preview dark-preview"></div>
                  <span>Escuro</span>
                  {theme === "dark" && <Icon d={ICONS.check} size={16} color="var(--orange)" />}
                </div>
                <div 
                  className={`theme-option ${theme === "light" ? "active" : ""}`}
                  onClick={() => handleSaveTheme("light")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="theme-preview light-preview"></div>
                  <span>Claro</span>
                  {theme === "light" && <Icon d={ICONS.check} size={16} color="var(--orange)" />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;