import { CHAIN_ID } from "web3/config";

const contracts = {
  curveRouter: {
    [CHAIN_ID.POLYGON]: "0xF16751C88150d525dE4152c70D1938B836100af0",
  },
  multicall: {
    [CHAIN_ID.POLYGON]: "0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507",
  },
};

export default contracts;
