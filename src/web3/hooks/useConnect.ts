import { useEffect } from "react";

import { connectorLocalStorageKey, ConnectorNames } from "../config";
import useAuth from "./useAuth";

const useConnect = () => {
  const { login } = useAuth();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(
      connectorLocalStorageKey
    ) as ConnectorNames;

    if (connectorId) {
      login(connectorId);
    }
  }, [login]);
};

export default useConnect;
