import React from "react";

import { styled } from "@mui/material";

import { Text } from "components/Text";
import colors from "config/theme/colors";
import { usePairsAndRoutes } from "state/trading/hooks";
import { damlev } from "utils/levHelper";
import { format } from "utils/number";

import { ExchangeBody, Image, SelectTokenContainer } from "./components/styles";

interface Props {
  filterPairs: string;
  setSearchValue: (newSearchValue) => void;
  setTokenIn: (newTokenIn) => void;
  setTokenOut: (newTokenOut) => void;
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

const ChooseTradingPair: React.FC<Props> = ({
  filterPairs,
  setSearchValue,
  setTokenIn,
  setTokenOut,
  setView,
}) => {
  const pairs = usePairsAndRoutes();
  const filteredPairs = pairs
    ? pairs.filter((p) => damlev(filterPairs.toLocaleLowerCase(), p))
    : [];

  const handlePairChange = (pair) => {
    setTokenIn(pair.token0.symbol);
    setTokenOut(pair.token1.symbol);
    setView("SWAP");
    setSearchValue("");
  };

  const renderToken = (pair) => {
    return (
      <SelectTokenInList key={pair.name} onClick={() => handlePairChange(pair)}>
        <SelectTokenContainer>
          <Image
            alt={`${pair.token0.symbol} logo`}
            src={`/images/tokens/${pair.token0.symbol.toLowerCase()}.svg`}
            width="24px"
            height="24px"
          />
          <Image
            alt={`${pair.token1.symbol} logo`}
            src={`/images/tokens/${pair.token1.symbol.toLowerCase()}.svg`}
            width="24px"
            height="24px"
          />
          <Text>{pair.name}</Text>
        </SelectTokenContainer>
        <Text>{format(pair.rate, 0, 5)}</Text>
      </SelectTokenInList>
    );
  };

  return (
    <>
      <ExchangeBody sx={{ padding: "8px 0" }}>
        <TokenList>{filteredPairs.map((p) => renderToken(p))}</TokenList>
      </ExchangeBody>
    </>
  );
};

export default ChooseTradingPair;
