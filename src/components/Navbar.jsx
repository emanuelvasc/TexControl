import Icon from "./Icon";
import { ICONS } from "../constants/icons";

const Navbar = ({ scrolled, onLogin }) => (
  <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
    <a href="#" className="nav-logo">
      <div className="logo-mark">T</div>
      TEX<span>CONTROL</span>
    </a>
    <ul className="nav-links">
      {["Início", "Recursos", "Produção", "Sobre", "Contato"].map((l) => (
        <li key={l}>
          <a href="#">{l}</a>
        </li>
      ))}
    </ul>
    <div className="nav-actions">
      <button className="btn-nav-login" onClick={onLogin}>
        Entrar
      </button>
    </div>
  </nav>
);

export default Navbar;
