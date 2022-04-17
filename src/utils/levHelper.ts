import * as levenshtein from "damerau-levenshtein";

import { TradingPair } from "state/trading/types";

export const damlev = (query: string, p: TradingPair) => {
  const [symbol1, symbol2] = p.name
    .toLowerCase()
    .split("/")
    .map((s) => s.substring(1));
  const symbol = symbol1.concat(symbol2);
  const reversed = symbol2.concat(symbol1);

  const lev = levenshtein(symbol, query).steps;
  const reversedLev = levenshtein(reversed, query).steps;

  if (query.length >= symbol.length) {
    return p.name.toLowerCase().includes(query) || lev <= 1 || reversedLev <= 1;
  }
  return p.name.toLowerCase().includes(query) || lev <= 2 || reversedLev <= 2;
};
