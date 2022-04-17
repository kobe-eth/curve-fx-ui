import floatingRateRegistryAbi from "config/abi/floatingRateRegistry.json";
import fixedRateRegistryAbi from "config/abi/fixedRateRegistry.json";
import tokens from "config/tokens";
import {
  getFixedRateRegistryAddress,
  getFloatingRateRegistryAddress,
} from "utils/addressHelpers";
import multicall from "utils/multicall";

export const fetchRegistry = async (chainId: number) => {
  const floatingRateRegistry = getFloatingRateRegistryAddress(chainId);

  const callsFloatingRate = [
    { address: floatingRateRegistry, name: "getCollaterals" },
    { address: floatingRateRegistry, name: "getVersions" },
    { address: floatingRateRegistry, name: "getSyntheticTokens" },
  ];

  const rawFloatingRateMetadata = await multicall(
    chainId,
    floatingRateRegistryAbi,
    callsFloatingRate
  );

  const floatingRateCollaterals = rawFloatingRateMetadata[0][0][0];
  const floatingRateVersions = rawFloatingRateMetadata[1][0][0];
  const floatingRateSyntheticToken = rawFloatingRateMetadata[2][0];

  const callsFloatingRateElemments = floatingRateSyntheticToken.map(
    (synthToken) => {
      return {
        address: floatingRateRegistry,
        name: "getElements",
        params: [synthToken, floatingRateCollaterals, floatingRateVersions],
      };
    }
  );

  const rawFloatingRateLp = await multicall(
    chainId,
    fixedRateRegistryAbi,
    callsFloatingRateElemments
  );

  return {
    floatingRate: {
      address: floatingRateRegistry,
      collaterals: floatingRateCollaterals,
      versions: floatingRateVersions,
      synthTokensSymbol: floatingRateSyntheticToken
        .map((synthToken, index) => {
          if (tokens.filter((t) => t.symbol === synthToken).length > 0) {
            const baseSynthToken = tokens.find((t) => t.symbol === synthToken);
            return {
              ...baseSynthToken,
              lpAddress: rawFloatingRateLp[index][0][0],
            };
          }
        })
        .filter((x) => x !== undefined),
    },
  };
};
