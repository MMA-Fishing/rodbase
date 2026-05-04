export default function StatCard({ icon, label, value }) {
  return (
    <div className="statCard">
      <div className="statIcon">{icon}</div>
      <div className="statValue">{value}</div>
      <div className="muted small">{label}</div>
    </div>
  );
}



