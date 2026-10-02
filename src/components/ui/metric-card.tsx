type MetricCardProps = {
  label: string;
  value: string;
  change: string;
  note: string;
};

export default function MetricCard({
  label,
  value,
  change,
  note,
}: MetricCardProps) {
  return (
    <article className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-change">
        {change}
        <span className="metric-note">{note}</span>
      </div>
    </article>
  );
}