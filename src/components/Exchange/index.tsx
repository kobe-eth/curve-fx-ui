import React, { useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, styled } from "@mui/material";

import colors from "config/theme/colors";

import ChooseAsset from "./ChooseAsset";
import ChooseTradingPair from "./ChooseTradingPair";
import ProtocolFees from "./components/ProtocolFees";
import Route from "./components/Route";
import SearchBar from "./components/SearchBar";
import { ExchangeHeader, SwapInfo, Wrapper } from "./components/styles";
import Swap from "./Swap";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  marginTop: "80px",
});

const Exchange: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [view, setView] = useState("SWAP");
  const [tokenIn, setTokenIn] = useState("EURS");
  const [tokenOut, setTokenOut] = useState("jEUR");
  const [tokenInAmount, setTokenInAmount] = useState("");
  const [tokenOutAmount, setTokenOutAmount] = useState("");

  const handleReverseToken = () => {
    const tmp = tokenIn;
    const tmpAmount = tokenInAmount;
    setTokenIn(tokenOut);
    setTokenOut(tmp);

    setTokenInAmount(tokenOutAmount);
    setTokenOutAmount(tmpAmount);
  };

  const renderHeader = () => {
    if (view.startsWith("CHOOSE_ASSET_")) {
      return (
        <ExchangeHeader>
          <IconButton
            sx={{ color: colors.textPrimary }}
            edge="start"
            onClick={() => setView("SWAP")}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          Choose Asset
        </ExchangeHeader>
      );
    } else {
      return <ExchangeHeader>Swap</ExchangeHeader>;
    }
  };

  const renderView = () => {
    switch (view) {
      case "SWAP": {
        return (
          <Swap
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            tokenInAmount={tokenInAmount}
            tokenOutAmount={tokenOutAmount}
            setTokenInAmount={setTokenInAmount}
            setTokenOutAmount={setTokenOutAmount}
            handleReverseToken={handleReverseToken}
            setView={setView}
          />
        );
      }
      case "CHOOSE_ASSET_0":
        return (
          <ChooseAsset
            filterTokens={searchValue}
            setSearchValue={setSearchValue}
            currentToken={tokenIn}
            currentOtherToken={tokenOut}
            setToken={setTokenIn}
            setOtherToken={setTokenOut}
            setView={setView}
          />
        );
      case "CHOOSE_ASSET_1":
        return (
          <ChooseAsset
            filterTokens={searchValue}
            setSearchValue={setSearchValue}
            currentToken={tokenOut}
            currentOtherToken={tokenIn}
            setToken={setTokenOut}
            setOtherToken={setTokenIn}
            setView={setView}
          />
        );
      case "TRADING_PAIR_LIST":
        return (
          <ChooseTradingPair
            filterPairs={searchValue}
            setSearchValue={setSearchValue}
            setTokenIn={setTokenIn}
            setTokenOut={setTokenOut}
            setView={setView}
          />
        );
      default: {
        return (
          <Swap
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            tokenInAmount={tokenInAmount}
            tokenOutAmount={tokenOutAmount}
            setTokenInAmount={setTokenInAmount}
            setTokenOutAmount={setTokenOutAmount}
            handleReverseToken={handleReverseToken}
            setView={setView}
          />
        );
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        {renderHeader()}
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          view={view}
          setView={setView}
        />
        {renderView()}
      </Wrapper>
      <SwapInfo>
        <ProtocolFees
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          tokenInAmount={tokenInAmount}
        />
        <Route
          tokenIn={tokenIn}
          tokenOut={tokenOut}
        />
      </SwapInfo>
    </Container>
  );
};

export default Exchange;
