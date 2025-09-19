export const formatKES = (amount: number): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatKESSimple = (amount: number): string => {
  return `KSh ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
};

export const parseKES = (value: string): number => {
  return parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
};