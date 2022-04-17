import { MetamaskIcon, WalletConnectIcon } from "components/Svg";

import { Config, ConnectorNames } from "./types";

const connectors: Config[] = [
  {
    title: "Metamask",
    icon: MetamaskIcon,
    connectorId: ConnectorNames.Injected,
    priority: 1,
  },
  {
    title: "WalletConnect",
    icon: WalletConnectIcon,
    connectorId: ConnectorNames.WalletConnect,
    priority: 2,
  },
];

export default connectors;
export const connectorLocalStorageKey = "connectorIdv2";
export const walletLocalStorageKey = "wallet";
