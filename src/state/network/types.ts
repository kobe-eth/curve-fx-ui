export interface Network {
  chainId: number;
}

// Slices state
export interface NetworkState {
  isInitialized: boolean;
  isLoading: boolean;
  data: Network;
}
