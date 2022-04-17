import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import getRpc from "../utils/rpc";
import { CHAIN_ID } from "./chains";
import { ConnectorNames } from "./types";

export const POLLING_INTERVAL = 12000;

const rpcUrl = getRpc(CHAIN_ID.POLYGON);
const supportedChains = Object.keys(CHAIN_ID).map((key) => CHAIN_ID[key]);

const injected = new InjectedConnector({ supportedChainIds: supportedChains });

const walletconnect = new WalletConnectConnector({
  rpc: { [CHAIN_ID.POLYGON]: rpcUrl },
  qrcode: true,
});

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
};

export {
  CHAIN_ID,
  NETWORK_LABEL,
  NETWORK_RPC,
  BLOCK_EXPLORER,
  CHAIN_PARAMS,
} from "./chains";
export {
  default as connectors,
  connectorLocalStorageKey,
  walletLocalStorageKey,
} from "./connectors";
export { ConnectorNames } from "./types";
export type { Config, Login } from "./types";
