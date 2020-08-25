/* eslint import/prefer-default-export: "off" */
export const getFirstDecimalNumber = (num: number): number => {
  const dotSplit = `${num}`.split(".");
  const hasDecimals = !!dotSplit[1];

  if (hasDecimals) {
    return +dotSplit[1][0];
  }
  console.warn("Number does not have decimals");
  return 0;
};
