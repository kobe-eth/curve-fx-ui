import sample from "lodash/sample";

import { CHAIN_ID, NETWORK_RPC } from "../config/chains";

const getRpc = (chainId: number) => {
  switch (chainId) {
    case CHAIN_ID.POLYGON:
      return sample(NETWORK_RPC[CHAIN_ID.POLYGON]);
  }
};

export default getRpc;
