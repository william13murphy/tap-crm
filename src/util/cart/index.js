export const calculateAmount = cartData => {
  if (cartData.length === 0) return 0;

  let totalPriceArray = cartData.map(item => {
    return item.price * item.quantity;
  });

  return totalPriceArray.reduce((pItem, cItem) => pItem + cItem);
};

export const calculateTaxAmount = (cartData, tax = 6) => {
  let totalAmount = calculateAmount(cartData);
  return +(totalAmount * (tax / 100)).toFixed(2);
};

export const calculateAmountWithTax = cartData => {
  if (cartData.length === 0) return 0;

  let totalPriceArray = cartData.map(item => {
    return (item.price + item.tax) * item.quantity;
  });

  return totalPriceArray.reduce((pItem, cItem) => pItem + cItem).toFixed(2);
};
