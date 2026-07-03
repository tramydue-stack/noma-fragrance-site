export const formatVND = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    currencyDisplay: 'code',
    maximumFractionDigits: 0
  }).format(amount).replace('VND', 'VNĐ').trim();
};
