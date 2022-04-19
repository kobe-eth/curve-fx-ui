import React from "react";

import { Button, styled } from "@mui/material";

import { MetamaskIcon } from "components/Svg";
import { Text } from "components/Text";
import colors from "config/theme/colors";
import { useBalances } from "state/balance/hooks";
import { format } from "utils/number";
import registerToken from "web3/utils/registerToken";

import { Image, SelectTokenContainer } from "../Exchange/components/styles";

const Wrapper = styled("div")({
  width: "100%",
  maxHeight: "360px",
  overflowX: "scroll",
  marginTop: "8px",
  borderTop: `2px solid ${colors.info}`,
  borderBottom: `2px solid ${colors.info}`,
});

const TokenList = styled("div")({
  marginBottom: "8px",
});

const SelectTokenInList = styled(SelectTokenContainer)({
  justifyContent: "space-between",
  padding: "8px 24px",
  borderBottom: `1px solid ${colors.info}`,
  height: "56px",
  cursor: "initial",
});

const UserToken: React.FC = () => {
  const balances = useBalances();

  const positiveBalance = balances.filter((t) => Number(t.userBalance) > 0);
  const zeroBalance = balances.filter((t) => Number(t.userBalance) === 0);

  const renderToken = (token) => {
    return (
      <SelectTokenInList key={token.symbol}>
        <SelectTokenContainer>
          <Image
            alt={`${token.symbol} logo`}
            src={`/images/tokens/${token.symbol.toLowerCase()}.svg`}
            width="24px"
            height="24px"
          />
          <Text>{token.symbol}</Text>
          <Button
            sx={{
              color: colors.textSecondary,
              marginLeft: "4px",
              fontSize: "12px",
              "&:hover": {
                backgroundColor: colors.background,
              },
              svg: {
                width: "14px",
                height: "14px",
              },
            }}
            onClick={() => {
              registerToken(
                token.address,
                token.symbol,
                `images/tokens/${token.symbol.toLowerCase()}.svg`
              );
            }}
          >
            Add to
            <MetamaskIcon style={{ margin: "0 0 2px 4px" }} />
          </Button>
        </SelectTokenContainer>
        <Text>{format(token.userBalance, token.decimals)}</Text>
      </SelectTokenInList>
    );
  };

  return (
    <Wrapper>
      {positiveBalance.length > 0 ? (
        <Text style={{ padding: "8px 24px" }}>You have</Text>
      ) : (
        <></>
      )}
      <TokenList>{positiveBalance.map((t) => renderToken(t))}</TokenList>
      {zeroBalance.length > 0 ? (
        <Text style={{ padding: "8px 24px" }}>Others</Text>
      ) : (
        <></>
      )}
      <TokenList>{zeroBalance.map((t) => renderToken(t))}</TokenList>
    </Wrapper>
  );
};

export default UserToken;
