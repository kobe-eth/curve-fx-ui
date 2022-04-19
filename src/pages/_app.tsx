import { Container } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

import colors from "config/theme/colors";
import Providers from "Providers";
import { useFetchBalance } from "state/balance/hooks";
import { useUpdateNetwork } from "state/network/hooks";
import { useFetchTradingData } from "state/trading/hooks";
import { useConnect } from "web3";

function GlobalHooks() {
  useUpdateNetwork();
  useConnect();
  useFetchBalance();
  useFetchTradingData();
  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <>
      <Head>
        <title>Curve FX</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="theme-color" content="#292929" />
        <meta name="description" content="Curve FX" />
      </Head>
      <Providers>
        <GlobalHooks />
        <Toaster
          position="top-center"
          reverseOrder={true}
          containerStyle={{ top: 96 }}
          toastOptions={{
            style: {
              padding: "4px 12px",
              backgroundColor: colors.background,
              color: colors.textPrimary,
              fontSize: "14px",
            },
          }}
        />
        <Container maxWidth="lg">
          <AnyComponent {...pageProps} />
        </Container>
      </Providers>
    </>
  );
}

export default MyApp;
