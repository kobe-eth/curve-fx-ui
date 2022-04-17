import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";

import { BLOCK_EXPLORER } from "web3/config";

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function getEtherscanLink(
  data: string | number,
  type: "transaction" | "token" | "address" | "block" | "countdown",
  chainId: number
): string {
  switch (type) {
    case "transaction": {
      return `${BLOCK_EXPLORER[chainId]}/tx/${data}`;
    }
    case "token": {
      return `${BLOCK_EXPLORER[chainId]}/token/${data}`;
    }
    case "block": {
      return `${BLOCK_EXPLORER[chainId]}/block/${data}`;
    }
    case "countdown": {
      return `${BLOCK_EXPLORER[chainId]}/block/countdown/${data}`;
    }
    default: {
      return `${BLOCK_EXPLORER[chainId]}/address/${data}`;
    }
  }
}

// account is not optional
export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
  );
}
