import { APYSample } from "@aave/react";

export function transformAssetHistoryData(raw: APYSample[]) {
  return raw.map((item) => ({
    date: new Date(item.date).toISOString(),
    supplyArr: Number(item.avgRate.value) * 100,
  }));
}
