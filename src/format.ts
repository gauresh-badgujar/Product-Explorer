// dummyjson prices are in USD; approximate fixed conversion since there's no live rate feed
export const USD_TO_INR = 83;

export const formatINR = (usdPrice: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(usdPrice * USD_TO_INR);
