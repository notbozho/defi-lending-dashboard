import ReserveView from "./ReserveView";

export default async function Page(
  props: PageProps<"/reserve/[assetAddress]"> & { searchParams: { chainId: string } }
) {
  const { assetAddress } = await props.params;
  const { chainId } = await props.searchParams;

  return <ReserveView assetAddress={assetAddress} chainId={Number(chainId)} />;
}
