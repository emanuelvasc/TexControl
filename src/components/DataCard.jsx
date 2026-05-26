const DataCard = ({ id, name, sub, badge, badgeClass }) => (
  <div className="data-card">
    <div className="data-card-top">
      <span className="data-card-id">{id}</span>
      {badge && (
        <span className={`status-badge ${badgeClass || ""}`}>{badge}</span>
      )}
    </div>
    <div className="data-card-name">{name}</div>
    <div className="data-card-sub">{sub}</div>
  </div>
);

export default DataCard;
