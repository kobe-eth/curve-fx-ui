import { ethers } from "ethers";

const signMessage = async (
  provider: any,
  account: string,
  message: string
): Promise<string> => {
  if (provider.provider?.wc) {
    const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message));
    const signature = await provider.provider?.wc.signPersonalMessage([
      wcMessage,
      account,
    ]);
    return signature;
  }

  return provider.getSigner(account).signMessage(message);
};

export default signMessage;
