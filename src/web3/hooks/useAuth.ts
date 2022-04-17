import { useCallback } from "react";

import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";

import { useNetworkChainId } from "state/network/hooks";

import { connectorsByName } from "../config";
import { connectorLocalStorageKey } from "../config/connectors";
import { ConnectorNames } from "../config/types";
import setupNetwork from "../utils/setupNetwork";

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();
  const chainId = useNetworkChainId();

  const login = useCallback(
    (connectorID: ConnectorNames) => {
      const connector = connectorsByName[connectorID];
      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork(chainId);
            if (hasSetup) {
              activate(connector);
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey);
            if (error instanceof NoEthereumProviderError) {
              console.error("Provider Error, No provider was found");
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector;
                walletConnector.walletConnectProvider = null;
              }
              console.error(
                "Authorization Error, Please authorize to access your account"
              );
            } else {
              console.error(`${error.name}, ${error.message}`);
            }
          }
        });
      } else {
        console.error(
          "Unable to find connector, The connector config is wrong"
        );
      }
    },
    [activate, chainId]
  );

  const logout = useCallback(() => {
    deactivate();
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem("walletconnect")) {
      connectorsByName.walletconnect.close();
      connectorsByName.walletconnect.walletConnectProvider = null;
    }
  }, [deactivate]);

  return { login, logout };
};

export default useAuth;
