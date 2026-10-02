export const years = [2024, 2023, 2022] as const;
export const monthOrder = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

export type SalesYear = (typeof years)[number];
export type ChartType = "bar" | "line" | "pie";

export type MonthlySales = {
  month: string;
  sales: number;
};

export const salesByYear: Record<SalesYear, MonthlySales[]> = {
  2024: [
    { month: "Jan", sales: 182400 },
    { month: "Feb", sales: 176800 },
    { month: "Mar", sales: 194200 },
    { month: "Apr", sales: 211500 },
    { month: "May", sales: 228100 },
    { month: "Jun", sales: 216700 },
    { month: "Jul", sales: 242900 },
    { month: "Aug", sales: 258400 },
    { month: "Sep", sales: 247600 },
    { month: "Oct", sales: 276300 },
    { month: "Nov", sales: 301800 },
    { month: "Dec", sales: 334500 },
  ],
  2023: [
    { month: "Jan", sales: 151200 },
    { month: "Feb", sales: 148600 },
    { month: "Mar", sales: 169800 },
    { month: "Apr", sales: 176300 },
    { month: "May", sales: 188400 },
    { month: "Jun", sales: 181900 },
    { month: "Jul", sales: 199700 },
    { month: "Aug", sales: 213500 },
    { month: "Sep", sales: 207100 },
    { month: "Oct", sales: 226800 },
    { month: "Nov", sales: 248900 },
    { month: "Dec", sales: 276400 },
  ],
  2022: [
    { month: "Jan", sales: 118600 },
    { month: "Feb", sales: 112900 },
    { month: "Mar", sales: 128400 },
    { month: "Apr", sales: 139700 },
    { month: "May", sales: 147200 },
    { month: "Jun", sales: 143600 },
    { month: "Jul", sales: 159300 },
    { month: "Aug", sales: 168800 },
    { month: "Sep", sales: 162500 },
    { month: "Oct", sales: 183100 },
    { month: "Nov", sales: 199400 },
    { month: "Dec", sales: 224700 },
  ],
};

export const chartColors = [
  "#286b54",
  "#d4a34f",
  "#dc765e",
  "#547b9b",
  "#8a759b",
  "#84a66a",
  "#d48b4b",
  "#5c9a91",
  "#b66c7d",
  "#9a8a5e",
  "#687b91",
  "#a7b778",
];