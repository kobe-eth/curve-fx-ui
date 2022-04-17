# Jarvis UI

## Run

```bash
yarn dev
```

## Build

```bash
yarn build
```

## Update RPC and chain config

RPC and chain settings can be updated from `src/web3/config/chains.ts`

```js
export const NETWORK_RPC = {
  [CHAIN_ID.POLYGON]: [process.env.NEXT_PUBLIC_BNB_MAINNET],
};
```

One RPC can be added to the array, or several to distribute the load between the endpoints.

