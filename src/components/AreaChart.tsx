import { Area } from '@ant-design/charts'
import { AreaOptions as G2plotProps } from '@antv/g2plot'
import { isEqual } from 'lodash'
import { Moment } from 'moment'
import React, { memo, useState } from 'react'
import { useQuery } from 'react-query'

import { getSeries } from '../api'
import { Series } from '../api/types'

import Loader from './Loader'

const AreaChart: React.FC<{ period: [Moment, Moment] }> = ({ period: [start, end] }) => {
  const [series, setSeries] = useState<Array<Series>>([])
  const [periodStart, periodEnd] = [start.toISOString(), end.toISOString()]
  const { isLoading, refetch } = useQuery(
    [`series-${periodStart}-${periodEnd}`, { gte: periodStart, lte: periodEnd }],
    (context) => getSeries(context.queryKey[1]),
    {
      refetchInterval: 5000,
      onSuccess: (data) => setSeries(data)
    }
  )
  if (!series.length && isLoading) {
    return <Loader />
  }

  const min = Math.min(...series.map((s) => s.balance)) * 0.95
  const max = Math.max(...series.map((s) => s.balance)) * 1.05

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

  return isEqual(prevPeriod, nextPeriod)
})
