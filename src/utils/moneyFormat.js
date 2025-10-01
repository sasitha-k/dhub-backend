export const moneyFormat = (amount, currency = 'LKR', locale = 'en-US') => {
    if(amount == null){
        return "";
    }
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  