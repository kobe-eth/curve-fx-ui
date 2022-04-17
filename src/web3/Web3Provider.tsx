import { Web3ReactProvider } from "@web3-react/core";

import getLibrary from "./utils/library";

const Web3Provider = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
  );
};

export default Web3Provider;
