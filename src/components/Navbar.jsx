import Icon from "./Icon";
import { ICONS } from "../constants/icons";

const Navbar = ({ scrolled, onLogin, onNavigate, onMenuClick, isLanding, isClient }) => {
  const handleClick = (e, page) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  // Função para clique na logo
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (isClient) {
      // Cliente: volta para Home
      if (onNavigate) {
        onNavigate("home");
      }
    } else if (!isLanding) {
      // Admin: volta para Dashboard
      if (onNavigate) {
        onNavigate("dashboard");
      }
    }
    // Se for Landing Page, não faz nada (ou pode recarregar)
  };

  // Links diferentes para cliente e admin
  const getNavLinks = () => {
    if (isClient) {
      return [
        { id: "home", label: "Início", page: "home" },
        { id: "producao", label: "Produção", page: "order" },
        { id: "contato", label: "Contato", page: "contact" },
        { id: "sobre", label: "Sobre", page: "about" },
      ];
    }
    return [
      { id: "inicio", label: "Início", page: "dashboard" },
      { id: "recursos", label: "Recursos", page: "stock" },
      { id: "producao", label: "Produção", page: "production" },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="navbar-left">
        {/* Menu hamburguer - só aparece no dashboard */}
        {!isLanding && (
          <button className="navbar-menu-btn" onClick={onMenuClick}>
            <Icon d={ICONS.menu} size={24} />
          </button>
        )}
        
        <a 
          href="#" 
          className="nav-logo" 
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <div className="logo-mark">T</div>
          TEX<span>CONTROL</span>
        </a>
      </div>

      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.id}>
            <a href="#" onClick={(e) => handleClick(e, link.page)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Botão Entrar - só aparece na landing page */}
      {isLanding && (
        <button className="btn-nav-login" onClick={onLogin}>
          Entrar
        </button>
      )}
    </nav>
  );
};

export default Navbar;