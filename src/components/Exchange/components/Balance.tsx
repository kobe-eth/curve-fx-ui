import React from "react";

import { Text } from "components/Text";
import colors from "config/theme/colors";
import { Balance } from "state/balance/types";
import { format } from "utils/number";

import { Flex } from "./styles";

interface BalanceProps {
  label: string;
  balance: Balance;
  warning?: boolean;
}

const Balance: React.FC<BalanceProps> = ({ label, balance, warning }) => {
  return (
    <Flex>
      <Text style={{ color: warning ? colors.secondary : colors.textPrimary }}>
        {warning ? "Insufficient funds" : label}
      </Text>
      <Text fontSize="14px" style={{ color: colors.textSecondary }}>
        Balance: {format(Number(balance.userBalance), balance.decimals)}
      </Text>
    </Flex>
  );
};

export default Balance;
