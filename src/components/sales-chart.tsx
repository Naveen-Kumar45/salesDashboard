"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartColors, monthOrder, type ChartType, type MonthlySales } from "@/lib/sales-data";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

type SalesChartProps = {
  data: MonthlySales[];
  type: ChartType;
};

function SalesTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-md border border-[#e5eae6] bg-white px-3 py-2 shadow-sm">
      <p className="mb-1 text-[11px] text-[#718079]">{label}</p>
      <p className="text-xs font-semibold text-[#172622]">{money.format(payload[0].value)}</p>
    </div>
  );
}

export default function SalesChart({ data, type }: SalesChartProps) {
  if (!data.length) {
    return <div className="empty-state">No months meet this sales threshold.</div>;
  }

  if (type === "pie") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="sales"
            nameKey="month"
            innerRadius="48%"
            outerRadius="78%"
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={entry.month} fill={chartColors[monthOrder.indexOf(entry.month as (typeof monthOrder)[number])]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => money.format(Number(value))} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  const axes = (
    <>
      <CartesianGrid vertical={false} stroke="#edf0ed" strokeDasharray="3 4" />
      <XAxis
        dataKey="month"
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#849089", fontSize: 11 }}
        dy={10}
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#849089", fontSize: 10 }}
        tickFormatter={(value: number) => `$${value / 1000}k`}
        width={54}
      />
      <Tooltip content={<SalesTooltip />} cursor={{ fill: "#f5f7f4" }} />
    </>
  );

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 14, bottom: 8, left: 0 }}>
          {axes}
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#286b54"
            strokeWidth={3}
            dot={{ r: 3, fill: "#fff", stroke: "#286b54", strokeWidth: 2 }}
            activeDot={{ r: 5, fill: "#286b54", stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 14, bottom: 8, left: 0 }}>
        {axes}
        <Bar dataKey="sales" fill="#286b54" radius={[4, 4, 0, 0]} maxBarSize={34} />
      </BarChart>
    </ResponsiveContainer>
  );
}