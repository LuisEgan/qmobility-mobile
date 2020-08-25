/* eslint import/prefer-default-export: "off" */
export const getFirstDecimalNumber = (num: number): number => {
  const dotSplit = `${num}`.split(".");
  const hasDecimals = !!dotSplit[1];

  return hasDecimals ? +dotSplit[1][0] : 0;
};
