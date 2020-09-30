export const kmToMiles = (km: number = 0, decimals: number = 2): number =>
  +(km * 0.621371).toFixed(decimals);

export const gramKmToGramMiles = (
  g: number = 0,
  decimals: number = 2,
): number => +(g * 1.60934).toFixed(decimals);
