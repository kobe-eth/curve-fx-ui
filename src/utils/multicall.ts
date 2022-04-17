import { Interface } from "@ethersproject/abi";

import { getMulticallContract } from "./contractHelpers";

export interface Call {
  address: string;
  name: string;
  params?: any[];
}

export interface MulticallOptions {
  requireSuccess?: boolean;
}

const multicall = async (chainId: number, callAbi: any[], calls: Call[]) => {
  if (calls.length > 0) {
    const multi = getMulticallContract(chainId);
    const itf = new Interface(callAbi);

    const calldata = calls.map((call) => [
      call.address.toLowerCase(),
      itf.encodeFunctionData(call.name, call.params),
    ]);
    const { returnData } = await multi.aggregate(calldata);
    const res = returnData.map((call, i) =>
      itf.decodeFunctionResult(calls[i].name, call)
    );
    return res;
  }
  return [];
};

export default multicall;
