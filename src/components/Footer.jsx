import Icon from "./Icon";
import { ICONS } from "../constants/icons";

const Footer = () => (
  <footer>
    <div className="footer-grid">
      <div>
        <div className="footer-logo-wrap">
          <span className="nav-logo" style={{ fontSize: 22 }}>
            <div className="logo-mark">T</div>
            TEX<span style={{ color: "var(--orange)" }}>CONTROL</span>
          </span>
        </div>
        <p className="footer-desc">
          Sistema de gestão industrial para confecções. Controle total do
          processo produtivo, pedidos e estoque.
        </p>
        <div className="footer-social">
          {[ICONS.instagram, ICONS.linkedin].map((ic, i) => (
            <a href="#" key={i}>
              <Icon d={ic} size={14} />
            </a>
          ))}
        </div>
      </div>
      <div>
        <div className="footer-col-title">Sistema</div>
        <ul className="footer-links">
          {["Dashboard", "Pedidos", "Produção", "Estoque", "Relatórios"].map(
            (l) => (
              <li key={l}>
                <a href="#">{l}</a>
              </li>
            ),
          )}
        </ul>
      </div>
      <div>
        <div className="footer-col-title">Empresa</div>
        <ul className="footer-links">
          {["Sobre nós", "Clientes", "Parceiros", "Blog", "Contato"].map(
            (l) => (
              <li key={l}>
                <a href="#">{l}</a>
              </li>
            ),
          )}
        </ul>
      </div>
      <div>
        <div className="footer-col-title">Newsletter</div>
        <p
          style={{
            fontSize: 13,
            color: "var(--muted)",
            marginBottom: 16,
            fontWeight: 300,
          }}
        >
          Receba atualizações e novidades do sistema.
        </p>
        <div className="newsletter-input-wrap">
          <input
            className="newsletter-input"
            type="email"
            placeholder="seu@email.com"
          />
          <button className="newsletter-btn">
            <Icon d={ICONS.arrowRight} size={16} />
          </button>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2025 TEXCONTROL. Todos os direitos reservados.</span>
      <span style={{ display: "flex", gap: 24 }}>
        {["Privacidade", "Termos"].map((l) => (
          <a
            key={l}
            href="#"
            style={{ color: "var(--muted)", textDecoration: "none" }}
          >
            {l}
          </a>
        ))}
      </span>
    </div>
  </footer>
);

export default Footer;
