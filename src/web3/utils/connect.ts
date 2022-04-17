import {
  connectorLocalStorageKey,
  walletLocalStorageKey,
} from "../config/connectors";
import { ConnectorNames } from "../config/types";

const connect = (login, walletConfig, onDismiss) => {
  if (typeof window !== "undefined") {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    // Since iOS does not support Trust Wallet we fall back to WalletConnect
    if (walletConfig.title === "Trust Wallet" && isIOS) {
      login(ConnectorNames.WalletConnect);
    } else {
      login(walletConfig.connectorId);
    }

    localStorage.setItem(walletLocalStorageKey, walletConfig.title);
    localStorage.setItem(connectorLocalStorageKey, walletConfig.connectorId);
    onDismiss();
  }
};

export default connect;
