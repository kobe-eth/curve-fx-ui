import { CHAIN_ID } from "web3/config";

const contracts = {
  curveRouter: {
    [CHAIN_ID.POLYGON]: "0x615C3a6f491a417873fD13EA5761b592897E9eE6",
  },
  multicall: {
    [CHAIN_ID.POLYGON]: "0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507",
  },
};

export default contracts;
