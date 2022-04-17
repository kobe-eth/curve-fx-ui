export const format = (data: number, decimals = 18, precision = 3) => {
  return Number(data / 10 ** decimals)
    .toFixed(precision)
    .toString();
};

export const getLocaleString = (data, nbDecimals: number) => {
  if (typeof data === "string") {
    return data;
  }
  return data ? Number(data).toFixed(nbDecimals).toString() : 0;
};
