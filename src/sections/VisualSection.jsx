import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";

const VisualSection = () => (
  <section className="visual-section">
    <div className="visual-inner">
      <div className="section-tag">Nossa plataforma</div>
      <h2 className="section-title">
        Tecnologia no
        <br />
        <span>chão de fábrica</span>
      </h2>
      <div className="visual-grid">
        <div className="visual-images">
          <div className="visual-img-main" />
          <div className="visual-img-sub" />
          <div className="visual-float">
            <div className="float-val">
              94<span>%</span>
            </div>
            <div className="float-lbl">SATISFAÇÃO DOS CLIENTES</div>
          </div>
          <div className="visual-float2">
            <div className="float2-num">+320</div>
            <div className="float2-lbl">CONFECÇÕES ATIVAS</div>
          </div>
        </div>
        <div className="visual-right">
          <div className="visual-points">
            {[
              {
                n: "01",
                title: "Visibilidade total",
                desc: "Acompanhe cada etapa do processo produtivo em tempo real, de qualquer lugar.",
              },
              {
                n: "02",
                title: "Integração completa",
                desc: "Pedidos, estoque, produção e financeiro conectados em um único sistema.",
              },
              {
                n: "03",
                title: "Dados que decidem",
                desc: "Relatórios inteligentes que transformam dados brutos em insights acionáveis.",
              },
            ].map((p) => (
              <div className="visual-point" key={p.n}>
                <div className="vp-num">{p.n}</div>
                <div className="vp-content">
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="visual-bar-group">
            {[
              {
                label: "Eficiência produtiva",
                pct: 94,
                color: "var(--orange)",
              },
              {
                label: "Redução de desperdício",
                pct: 78,
                color: "var(--accent)",
              },
              { label: "Pontualidade nas entregas", pct: 89, color: "#10b981" },
            ].map((b) => (
              <div className="v-bar" key={b.label}>
                <div className="v-bar-top">
                  <span>{b.label}</span>
                  <span>{b.pct}%</span>
                </div>
                <div className="v-bar-track">
                  <div
                    className="v-bar-fill"
                    style={{ width: `${b.pct}%`, background: b.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default VisualSection;
