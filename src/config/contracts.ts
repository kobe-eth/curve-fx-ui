import { CHAIN_ID } from "web3/config";

const contracts = {
  curveRouter: {
    [CHAIN_ID.POLYGON]: "0x615C3a6f491a417873fD13EA5761b592897E9eE6",
  },
  liquidityRouter: {
    [CHAIN_ID.POLYGON]: "0xb711f3A71c00D92EF862A4aF2f584635DfE318b8",
  },
  synthereumFinder: {
    [CHAIN_ID.POLYGON]: "0x43a98e5C4A7F3B7f11080fc9D58b0B8A80cA954e",
  },
  multicall: {
    [CHAIN_ID.POLYGON]: "0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507",
  },
};

export default contracts;
