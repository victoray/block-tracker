import { Area } from '@ant-design/charts'
import { AreaOptions as G2plotProps } from '@antv/g2plot'
import React, { memo } from 'react'
import { useQuery } from 'react-query'

import { getSeries } from '../api'

import Loader from './Loader'

const AreaChart: React.FC = () => {
  const { data: series, isLoading } = useQuery('series', getSeries, {
    refetchInterval: 5000
  })

  if (!series || isLoading) {
    return <Loader />
  }

  const min = Math.min(...series.map((s) => s.balance)) - 10000
  const max = Math.max(...series.map((s) => s.balance)) + 10000

  const config: G2plotProps = {
    data: series,
    yField: 'balance',
    xField: 'date',
    line: {
      size: 0.5,
      color: '#1da57a'
    },
    padding: 40,
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

export default memo(AreaChart, () => true)
