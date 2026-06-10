import ReactCountryFlag from "react-country-flag";
import { countries } from "countries-list";

// Get country code from currency code (e.g., "USD" -> "US")
export const getCountryCodeFromCurrency = (currency: string) => {
  if (!currency) return "US";
  const code = currency.toUpperCase();
  if (code === "EUR") return "EU";
  return code.substring(0, 2);
};

// Get country code from country name (e.g., "Nigeria" -> "NG")
export const getCountryCodeFromName = (countryName: string) => {
  if (!countryName) return "US";
  const found = Object.entries(countries).find(
    ([_, c]) => c.name.toLowerCase() === countryName.toLowerCase()
  );
  return found ? found[0] : "US"; // default to US if not found
};

export function CurrencyFlag({ currency, className }: { currency: string, className?: string }) {
  const countryCode = getCountryCodeFromCurrency(currency);
  return (
    <div className={`overflow-hidden rounded-sm border border-zinc-100 flex items-center justify-center ${className || 'w-6 h-4 shrink-0'}`}>
      <ReactCountryFlag countryCode={countryCode} svg style={{ width: '100%', height: '100%', objectFit: 'cover' }} title={currency} />
    </div>
  );
}

export function CountryFlag({ countryName, className }: { countryName: string, className?: string }) {
  const countryCode = getCountryCodeFromName(countryName);
  return (
    <div className={`overflow-hidden rounded-sm border border-zinc-100 flex items-center justify-center ${className || 'w-6 h-4 shrink-0'}`}>
      <ReactCountryFlag countryCode={countryCode} svg style={{ width: '100%', height: '100%', objectFit: 'cover' }} title={countryName} />
    </div>
  );
}
