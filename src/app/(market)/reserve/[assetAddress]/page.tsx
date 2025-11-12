import { use } from "react";

import ReserveView from "./ReserveView";

export default function Page({
  params,
}: {
  params: Promise<{ marketAddress: string; assetAddress: string }>;
}) {
  const { assetAddress } = use(params);

  return <ReserveView assetAddress={assetAddress} />;
}
