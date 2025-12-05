export const truncateAddress = (address: string) => `${address.slice(0, 4)}...${address.slice(-4)}`;

export const truncateMiddle = (str: string, frontChars = 6, backChars = 4) => {
  if (str.length <= frontChars + backChars) {
    return str;
  }

  return `${str.slice(0, frontChars)}...${str.slice(-backChars)}`;
};
