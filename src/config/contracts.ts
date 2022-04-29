import { CHAIN_ID } from "web3/config";

const contracts = {
  curveRouter: {
    [CHAIN_ID.POLYGON]: "0x15E45FA42A065993Fa1Cd47a197798726b5285f4",
  },
  multicall: {
    [CHAIN_ID.POLYGON]: "0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507",
  },
};

export default contracts;
