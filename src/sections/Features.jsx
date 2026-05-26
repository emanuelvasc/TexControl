import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";

const Features = () => {
  const features = [
    {
      num: "01",
      icon: ICONS.orders,
      name: "Controle de Pedidos",
      desc: "Gerencie todo o fluxo de pedidos desde a entrada até a entrega. Acompanhe status em tempo real, prazos e prioridades.",
      tags: ["Rastreamento", "Prazos", "Prioridades", "Notificações"],
    },
    {
      num: "02",
      icon: ICONS.production,
      name: "Produção Inteligente",
      desc: "Monitore linhas de produção, distribua tarefas e acompanhe o desempenho de cada equipe.",
      tags: ["Linhas", "Metas", "Eficiência"],
    },
    {
      num: "03",
      icon: ICONS.stock,
      name: "Estoque",
      desc: "Controle de insumos, tecidos e produtos acabados com alertas automáticos.",
      tags: ["Insumos", "Alertas", "Inventário"],
    },
    {
      num: "04",
      icon: ICONS.chart,
      name: "Relatórios",
      desc: "Dashboards analíticos completos para tomada de decisão baseada em dados reais.",
      tags: ["Analytics", "Exportar", "KPIs"],
    },
  ];

  return (
    <div className="features">
      <div className="section-tag">Funcionalidades</div>
      <h2 className="section-title">
        Sistema completo
        <br />
        <span>para sua confecção</span>
      </h2>
      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-block" key={i}>
            <div className="feature-num">{f.num}</div>
            <div className="feature-icon">
              <Icon d={f.icon} size={22} color="var(--orange)" />
            </div>
            <div className="feature-name">{f.name}</div>
            <p className="feature-desc">{f.desc}</p>
            <div className="feature-tags">
              {f.tags.map((t) => (
                <span className="feature-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <div className="feature-arrow">
              VER MAIS{" "}
              <Icon d={ICONS.arrowRight} size={14} color="var(--orange)" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
