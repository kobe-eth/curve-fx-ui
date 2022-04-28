import { CHAIN_ID } from "web3/config";

const contracts = {
  curveRouter: {
    [CHAIN_ID.POLYGON]: "0xF92DF2819CA805876DA9B03C90e53F8a0037c290",
  },
  multicall: {
    [CHAIN_ID.POLYGON]: "0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507",
  },
};

export default contracts;
