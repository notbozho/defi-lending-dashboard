import ReserveView from "./ReserveView";

export default async function Page(props: PageProps<"/reserve/[assetAddress]">) {
  const { assetAddress } = await props.params;

  return <ReserveView assetAddress={assetAddress} />;
}
