import { BigDecimal, Currency } from "@aave/react";

export type HasCurrency = {
  currency: {
    name: string;
    symbol: string;
    imageUrl?: string;
    address?: string;
  };
};

export type HasUnderlyingToken = {
  underlyingToken: Currency;
};

export type HasApy = {
  apy: {
    value: BigDecimal;
  };
};
