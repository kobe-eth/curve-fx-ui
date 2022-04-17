import toast from "react-hot-toast";

import Toast from "components/Toast";

export const createTxToast = (tx, toastText) => {
  const txHash = tx.hash;
  const txLink = `https://polygonscan.com/tx/${txHash}`;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toast((t) => <Toast text={toastText} link={txLink} />, {
    duration: 10000,
  });
};

export const errorFromProviderToast = (error) => {
  try {
    if (error["message"] === "Internal JSON-RPC error.") {
      toast.error(error["data"]["message"]);
    } else {
      toast.error(error["message"]);
    }
  } catch (e) {
    toast.error("Error");
  }
};
