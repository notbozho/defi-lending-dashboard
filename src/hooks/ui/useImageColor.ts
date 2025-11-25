import { useQuery } from "@tanstack/react-query";

import { getAverageHex } from "@/lib/utils";
import { SEVEN_DAYS } from "@/utils/constants";

export function useImageColor(url: string) {
  return useQuery({
    queryKey: ["ImageColor", url],
    queryFn: () => getAverageHex(url),
    staleTime: SEVEN_DAYS,
    gcTime: SEVEN_DAYS,
    refetchOnWindowFocus: false,
  });
}
