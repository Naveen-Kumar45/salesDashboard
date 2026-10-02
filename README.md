# Northline Sales Overview

A responsive sales dashboard built with Next.js 15, TypeScript, Tailwind CSS, Recharts, and Lucide icons. The dashboard displays monthly sales for 2022, 2023, and 2024, with year selection, a minimum-sales filter, and bar, line, and pie chart views.

## Data

The included figures are illustrative mock data created for this demo. They are not downloaded from Kaggle and are not connected to a live API. Replace `src/lib/sales-data.ts` with a verified dataset or API integration before using the figures for business decisions.

## Getting started

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Available scripts

```bash
npm run dev     # Start the development server
npm run build   # Create a production build
npm run start   # Serve the production build
npm run lint    # Run ESLint
```

## Project structure

```text
src/
	app/                 App Router entry point, layout, and global styles
	components/
		ui/                Reusable atomic UI components
		sales-chart.tsx    Recharts visualizations
		sales-dashboard.tsx Dashboard composition and interactive controls
	lib/
		sales-data.ts      Typed illustrative monthly sales data
```

## Data source upgrades

To connect a real source, replace the local values with a typed API response and keep the chart-facing shape as `{ month, sales }`. For Kaggle data, download the dataset through Kaggle's official API or dataset page, verify its license and attribution terms, and document the source before publishing it with this project.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Notes

- The chart supports bar, line, and pie views with the same threshold-filtered data.
- Year-over-year comparison is shown when a prior year is available; 2022 has no 2021 baseline in this demo.
- A real dataset or API can be added by replacing the values in `src/lib/sales-data.ts` while preserving the `{ month, sales }` shape.
- Before using Kaggle data, review its license and attribution requirements and record the dataset source here.

