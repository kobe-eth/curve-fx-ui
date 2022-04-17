import { Token } from "state/types";

interface SynthTokenFromRegistry extends Token {
  lpAddress: string;
}

export interface Registry {
  address: string;
  collaterals: string;
  versions: number;
  synthTokensSymbol: SynthTokenFromRegistry[];
}

// Slices state
export interface RegistryState {
  isFetched: boolean;
  data: {
    floatingRate: Registry;
    fixedRate: Registry;
  };
}
