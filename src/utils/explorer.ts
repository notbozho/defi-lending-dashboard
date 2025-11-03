type ExplorerLinkBuilderConfig = {
  baseUrl: string;
  addressPrefix?: string;
  txPrefix?: string;
};

type ExplorerLinkBuilderProps = { tx: string; address?: never } | { address: string; tx?: never };

export const linkBuilder =
  ({ baseUrl, addressPrefix = "address", txPrefix = "tx" }: ExplorerLinkBuilderConfig) =>
  ({ tx, address }: ExplorerLinkBuilderProps): string => {
    if (tx) return `${baseUrl}/${txPrefix}/${tx}`;
    if (address) return `${baseUrl}/${addressPrefix}/${address}`;
    return baseUrl;
  };
