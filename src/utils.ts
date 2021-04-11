import moment, { Moment } from 'moment'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export const formatAmount = (amount: number): string => formatter.format(amount)

export enum Period {
  all = 'all',
  oneHour = '1h',
  twelveHours = '12h',
  oneDay = '1d',
  oneWeek = '1w',
  oneMonth = '1m',
  oneYear = '1y'
}

export const getPeriod = (period: Period): [Moment, Moment] => {
  const timeMapping: Record<Period, [Moment, Moment]> = {
    [Period.all]: [moment().subtract(2, 'years'), moment()],
    [Period.oneHour]: [moment().subtract(1, 'hour'), moment()],
    [Period.twelveHours]: [moment().subtract(12, 'hours'), moment()],
    [Period.oneDay]: [moment().subtract(1, 'day'), moment()],
    [Period.oneWeek]: [moment().subtract(1, 'week'), moment()],
    [Period.oneMonth]: [moment().subtract(1, 'month'), moment()],
    [Period.oneYear]: [moment().subtract(1, 'year'), moment()]
  }

  return timeMapping[period]
}
