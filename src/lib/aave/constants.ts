import { TimeWindow } from "@aave/react";

export const TimeWindowMap: Record<"24H" | "1W" | "1M" | "6M" | "1Y", TimeWindow> = {
  "24H": TimeWindow.LastDay,
  "1W": TimeWindow.LastWeek,
  "1M": TimeWindow.LastMonth,
  "6M": TimeWindow.LastSixMonths,
  "1Y": TimeWindow.LastYear,
};
