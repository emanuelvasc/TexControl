import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";

const Hero = ({ onLogin }) => (
  <section className="hero">
    <div className="hero-bg" />
    <div className="hero-grid" />
    <div className="hero-noise" />
    <div className="hero-content">
      <div className="hero-left">
        <div className="hero-eyebrow">Gestão inteligente para confecções</div>
        <h1 className="hero-title">
          Transformando
          <br />
          produção em
          <br />
          <em>controle total</em>
        </h1>
        <p className="hero-desc">
          Gerencie pedidos, estoque, produção e desempenho em um único sistema
          projetado para confecções modernas.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={onLogin}>
            Entrar no sistema <Icon d={ICONS.arrowRight} size={16} />
          </button>
          <button className="btn-secondary">
            Explorar recursos <Icon d={ICONS.eye} size={16} />
          </button>
        </div>
      </div>
      <div className="hero-card">
        <div className="hero-card-label">// produção em tempo real</div>
        <div className="stat-row">
          {[
            { num: "2.4", unit: "K", lbl: "Peças produzidas hoje", fill: 78 },
            { num: "98", unit: "%", lbl: "Taxa de eficiência", fill: 98 },
            { num: "47", unit: "", lbl: "Pedidos ativos", fill: 62 },
          ].map((s, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-num">
                {s.num}
                <span>{s.unit}</span>
              </div>
              <div className="stat-label">{s.lbl}</div>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${s.fill}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="hero-scroll">
      <span>SCROLL</span>
      <div className="scroll-line" />
    </div>
  </section>
);

export default Hero;
