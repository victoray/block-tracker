import { Area } from '@ant-design/charts'
import { AreaOptions as G2plotProps } from '@antv/g2plot'
import { isEqual } from 'lodash'
import { Moment } from 'moment'
import React, { memo } from 'react'
import { useQuery } from 'react-query'

import { getSeries } from '../api'

import Loader from './Loader'

const AreaChart: React.FC<{ period: [Moment, Moment] }> = ({ period: [start, end] }) => {
  const [periodStart, periodEnd] = [start.toISOString(), end.toISOString()]
  const { data: series, isLoading, refetch } = useQuery(
    [`series-${periodStart}-${periodEnd}`, { gte: periodStart, lte: periodEnd }],
    (context) => getSeries(context.queryKey[1]),
    {
      refetchInterval: 5000
    }
  )
  if (!series || isLoading) {
    return <Loader />
  }

  const min = Math.max(Math.min(...series.map((s) => s.balance)) - 10000, 0)
  const max = Math.max(...series.map((s) => s.balance)) + 10000

  const config: G2plotProps = {
    data: series,
    yField: 'balance',
    xField: 'date',
    line: {
      size: 0.5,
      color: '#1da57a'
    },
    padding: 60,
    xAxis: {
      tickCount: 5
    },
    yAxis: {
      grid: null,
      tickCount: 5,
      min,
      max
    },
    animation: false,
    areaStyle: function areaStyle() {
      return { fill: 'rgba(29, 165, 122, 0.4)' }
    }
  }

  return <Area {...config} />
}

export default memo(AreaChart, (props, nextProps) => {
  const prevPeriod = props.period.map((p) => p.toISOString())
  const nextPeriod = nextProps.period.map((p) => p.toISOString())

  console.log(isEqual(prevPeriod, nextPeriod))
  console.log(prevPeriod, nextPeriod)

  return isEqual(prevPeriod, nextPeriod)
})
