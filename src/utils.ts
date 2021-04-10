const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export const formatAmount = (amount: number): string => formatter.format(amount)
