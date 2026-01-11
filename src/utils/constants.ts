export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000000";

export const NATIVE_TOKEN_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export const INPUT_REGEX = /^\d*\.?\d*$/;

export const CHAINLIST_URL = "https://chainid.network/chains.json";

export const NETWORK_LOGO_URL = (chain: string) =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chain}/info/logo.png`;
