const ActivityItem = ({ dotColor, text, time }) => (
  <div className="activity-item">
    <div className="activity-dot" style={{ background: dotColor }} />
    <div className="activity-text">{text}</div>
    <div className="activity-time">{time}</div>
  </div>
);

export default ActivityItem;
