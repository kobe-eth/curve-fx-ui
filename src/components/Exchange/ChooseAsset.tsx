import React from "react";

import { styled } from "@mui/material";

import { Text } from "components/Text";
import colors from "config/theme/colors";
import { useBalances } from "state/balance/hooks";
import { format } from "utils/number";

import { ExchangeBody, Image, SelectTokenContainer } from "./components/styles";

interface Props {
  filterTokens: string;
  setSearchValue: (newSearchValue) => void;
  currentToken: string;
  currentOtherToken: string;
  setToken: (newToken) => void;
  setOtherToken: (newToken) => void;
  setView: (view) => void;
}

const TokenList = styled("div")({
  marginBottom: "8px",
});

const SelectTokenInList = styled(SelectTokenContainer)({
  justifyContent: "space-between",
  padding: "8px 16px",
  borderBottom: `1px solid ${colors.info}`,
  height: "56px",
  "&:hover": {
    backgroundColor: colors.background,
  },
});

const ChooseAsset: React.FC<Props> = ({
  filterTokens,
  setSearchValue,
  currentToken,
  currentOtherToken,
  setToken,
  setOtherToken,
  setView,
}) => {
  const balances = useBalances();

  const positiveBalance = balances.filter((t) => t.userBalance !== "0");
  const zeroBalance = balances.filter((t) => t.userBalance === "0");
  const filteredPositiveBalance =
    filterTokens === ""
      ? positiveBalance
      : positiveBalance.filter((t) =>
          t.symbol.toLowerCase().includes(filterTokens.toLowerCase())
        );

  const filteredZeroBalance =
    filterTokens === ""
      ? zeroBalance
      : zeroBalance.filter((t) =>
          t.symbol.toLowerCase().includes(filterTokens.toLowerCase())
        );

  const handleTokenChange = (token) => {
    if (token.symbol === currentOtherToken) {
      setOtherToken(currentToken);
    }
    setToken(token.symbol);
    setView("SWAP");
    setSearchValue("");
  };

  const renderToken = (token) => {
    return (
      <SelectTokenInList
        key={token.symbol}
        onClick={() => handleTokenChange(token)}
      >
        <SelectTokenContainer>
          <Image
            alt={`${token.symbol} logo`}
            src={`/images/tokens/${token.symbol.toLowerCase()}.svg`}
            width="24px"
            height="24px"
          />
          <Text>{token.symbol}</Text>
        </SelectTokenContainer>
        <Text>{format(token.userBalance, token.decimals)}</Text>
      </SelectTokenInList>
    );
  };

  return (
    <>
      <ExchangeBody sx={{ padding: "8px 0" }}>
        {filteredPositiveBalance.length > 0 ? (
          <Text style={{ padding: "8px 16px" }}>You have</Text>
        ) : (
          <></>
        )}
        <TokenList>
          {filteredPositiveBalance.map((t) => renderToken(t))}
        </TokenList>
        {filteredZeroBalance.length > 0 ? (
          <Text style={{ padding: "8px 16px" }}>Others</Text>
        ) : (
          <></>
        )}
        <TokenList>{filteredZeroBalance.map((t) => renderToken(t))}</TokenList>
      </ExchangeBody>
    </>
  );
};

export default ChooseAsset;
