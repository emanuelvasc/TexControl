import Icon from "./Icon";

const KpiCard = ({ label, value, delta, up, icon, color, valueSize = 40 }) => (
  <div className="kpi-card">
    <div className="kpi-icon">
      <Icon d={icon} size={20} color={color} />
    </div>
    <div className="kpi-label">{label}</div>
    <div className="kpi-value" style={{ fontSize: valueSize }}>
      {value}
    </div>
    {delta && (
      <div className={`kpi-delta ${up ? "delta-up" : "delta-down"}`}>
        {up ? "↑" : "↓"} {delta}
      </div>
    )}
  </div>
);

export default KpiCard;
