import Image from "next/image";

import { NETWORK_LOGO_URL } from "@/utils/constants";

export default function ChainIcon({ chainKey }: { chainKey?: string }) {
  if (!chainKey) return null;

  return (
    <Image
      src={NETWORK_LOGO_URL(chainKey.toLowerCase())}
      alt="Chain Icon"
      width={32}
      height={32}
      className="size-6 rounded-md"
    />
  );
}
