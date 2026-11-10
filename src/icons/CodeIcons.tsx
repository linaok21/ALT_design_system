import { CodeIcon, type CodeIconBaseProps } from './CodeIcon';

export interface CryptoIconProps extends CodeIconBaseProps {
  /** Ticker as it comes from the exchange API: "BTC", "eth", "USDT". */
  symbol: string;
}
/** Coin logo by ticker. Figma: "Icon / Crypto / Name (TICKER)". Default 24px (Figma source is 40px). */
export function CryptoIcon({ symbol, ...rest }: CryptoIconProps) {
  return <CodeIcon group="crypto" code={symbol} {...rest} />;
}

export interface CurrencyIconProps extends CodeIconBaseProps {
  /** ISO 4217 currency code: "UAH", "USD", "EUR". */
  code: string;
}
/** Fiat currency by ISO 4217 code. Figma: "Icon / Currency / Name (CODE)". */
export function CurrencyIcon({ code, ...rest }: CurrencyIconProps) {
  return <CodeIcon group="currency" code={code} {...rest} />;
}

export interface FlagProps extends CodeIconBaseProps {
  /**
   * ISO 3166-1 country code ("UA", "US"), ISO 3166-2 region code ("GB-ENG", "US-HI"),
   * or a project code for places without one ("XK", "EU", "UN", "X-NATO").
   */
  country: string;
}
/** Round flag by country / region code. Figma: "Icon / Flags / Name (CODE)". */
export function Flag({ country, ...rest }: FlagProps) {
  return <CodeIcon group="flags" code={country} {...rest} />;
}

export interface BrandIconProps extends CodeIconBaseProps {
  /** Name as in Figma: "google", "apple", "dashboard 1". */
  name: string;
}
/** Colored brand logos. Figma: "Icon / company / …", "Icon / colorated / …". */
export function BrandIcon({ name, ...rest }: BrandIconProps) {
  return <CodeIcon group="brand" code={name} round={false} {...rest} />;
}

export interface IllustrationProps extends CodeIconBaseProps {
  /** Name as in Figma: "Security", "Reports", "Cloud-based". */
  name: string;
}
/** 64px illustrations for empty states and feature blocks. Figma: top-level "Access", "Security"… */
export function Illustration({ name, size = 64, ...rest }: IllustrationProps) {
  return <CodeIcon group="illustrations" code={name} size={size} round={false} {...rest} />;
}
