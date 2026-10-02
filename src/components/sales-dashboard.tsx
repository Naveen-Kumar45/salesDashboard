"use client";

import { useState } from "react";
import {
  BarChart3,
  ChartNoAxesColumnIncreasing,
  CircleHelp,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Sparkles,
} from "lucide-react";
import MetricCard from "@/components/ui/metric-card";
import SalesChart from "@/components/sales-chart";
import { chartColors, monthOrder, salesByYear, years, type ChartType, type SalesYear } from "@/lib/sales-data";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const chartOptions: Array<{ type: ChartType; label: string; Icon: typeof BarChart3 }> = [
  { type: "bar", label: "Bar chart", Icon: ChartNoAxesColumnIncreasing },
  { type: "line", label: "Line chart", Icon: LineChartIcon },
  { type: "pie", label: "Pie chart", Icon: PieChartIcon },
];

export default function SalesDashboard() {
  const [year, setYear] = useState<SalesYear>(2024);
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [threshold, setThreshold] = useState(0);

  const yearData = salesByYear[year];
  const visibleData = yearData.filter((item) => item.sales >= threshold);
  const total = visibleData.reduce((sum, item) => sum + item.sales, 0);
  const average = visibleData.length ? total / visibleData.length : 0;
  const bestMonth = visibleData.reduce<(typeof visibleData)[number] | null>(
    (best, item) => (!best || item.sales > best.sales ? item : best),
    null,
  );
  const previousData = year === 2022
    ? []
    : salesByYear[(year - 1) as SalesYear].filter((item) => item.sales >= threshold);
  const previousTotal = previousData.reduce((sum, item) => sum + item.sales, 0);
  const annualChange = previousTotal
    ? ((total / previousTotal - 1) * 100).toFixed(1)
    : null;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <span className="brand-mark"><ChartNoAxesColumnIncreasing size={17} strokeWidth={2.5} /></span>
          <span>NORTHLINE</span>
        </div>
        <div className="topbar-right">
          <span className="status-copy"><span className="status-dot" />All systems operational</span>
          <span className="avatar" aria-label="Account: Alex Morgan">AM</span>
        </div>
      </header>

      <main className="main-content">
        <section className="page-heading" aria-labelledby="page-title">
          <div>
            <div className="eyebrow"><Sparkles size={13} /> Performance report</div>
            <h1 id="page-title">Sales overview</h1>
            <p>Track your monthly revenue and spot the moments that move the business.</p>
          </div>
          <div className="year-tabs" role="group" aria-label="Select sales year">
            {years.map((item) => (
              <button
                key={item}
                type="button"
                className="year-tab"
                aria-pressed={year === item}
                onClick={() => setYear(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="metric-grid" aria-label={`${year} sales summary`}>
          <MetricCard
            label="Total sales"
            value={currency.format(total)}
            change={annualChange ? `${Number(annualChange) >= 0 ? "+" : ""}${annualChange}%` : "—"}
            note={annualChange ? "vs. previous year" : "No prior year data"}
          />
          <MetricCard
            label="Monthly average"
            value={currency.format(average)}
            change={`${visibleData.length} of 12 months`}
            note="in current view"
          />
          <MetricCard
            label="Top month"
            value={bestMonth ? `${bestMonth.month} · ${currency.format(bestMonth.sales)}` : "—"}
            change={bestMonth ? "Highest revenue" : "No matching months"}
            note=""
          />
        </section>

        <section className="chart-panel" aria-labelledby="chart-heading">
          <div className="chart-toolbar">
            <div className="section-heading">
              <div>
                <h2 id="chart-heading">Monthly sales</h2>
                <p>{year} · US dollars</p>
              </div>
              <button
                type="button"
                title="Illustrative mock data, not sourced from Kaggle"
                aria-label="About this dataset"
                className="grid h-7 w-7 place-items-center rounded-full text-[#89958e] hover:bg-[#f5f7f4]"
              >
                <CircleHelp size={15} />
              </button>
            </div>
            <div className="chart-toolbar-controls">
              <label className="filter-label" htmlFor="sales-threshold">
                Min. sales
                <span className="threshold-wrap">
                  <span className="threshold-currency">$</span>
                  <input
                    id="sales-threshold"
                    className="threshold-input"
                    type="number"
                    min="0"
                    step="10000"
                    value={threshold || ""}
                    placeholder="0"
                    onChange={(event) => setThreshold(Math.max(0, Number(event.target.value) || 0))}
                  />
                </span>
              </label>
              <div className="chart-types" role="group" aria-label="Select chart type">
                {chartOptions.map(({ type, label, Icon }) => (
                  <button
                    key={type}
                    type="button"
                    className="chart-type-button"
                    aria-label={label}
                    aria-pressed={chartType === type}
                    title={label}
                    onClick={() => setChartType(type)}
                  >
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="chart-canvas" role="group" aria-label={`${chartType} chart of ${year} monthly sales`}>
            <SalesChart data={visibleData} type={chartType} />
          </div>
          {chartType === "pie" && visibleData.length > 0 && (
            <div className="chart-legend" aria-label="Monthly sales legend">
              {visibleData.map((item) => (
                <span className="legend-item" key={item.month}>
                  <span className="legend-swatch" style={{ background: chartColors[monthOrder.indexOf(item.month as (typeof monthOrder)[number])] }} />
                  {item.month}
                </span>
              ))}
            </div>
          )}
        </section>

        <div className="data-note">
          <span>Sample figures are illustrative mock data for dashboard demonstration.</span>
          <span>No Kaggle dataset or live API is connected.</span>
        </div>
      </main>
    </div>
  );
}