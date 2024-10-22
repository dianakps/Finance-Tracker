export const currencyFormatter = (amount) => {
  const formatter = Intl.NumberFormat("de-DE", {
    currency: "EUR",
    style: "currency",
  });

  return formatter.format(amount);
};
