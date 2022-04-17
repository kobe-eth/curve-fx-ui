import { ethers } from "ethers";

import { POLLING_INTERVAL } from "../config";

const getLibrary = (provider): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

export default getLibrary;
