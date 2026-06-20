export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDuration(duration: string) {
  return duration.replace('h', 'h ').replace('m', 'm');
}
