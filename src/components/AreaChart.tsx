import { Area } from '@ant-design/charts'
import { AreaOptions as G2plotProps } from '@antv/g2plot'
import { isEqual } from 'lodash'
import React, { memo, useState } from 'react'
import { useQuery } from 'react-query'

import { getSeries } from '../api'
import { Series } from '../api/types'
import { getPeriod, Period } from '../utils'

import Loader from './Loader'

const AreaChart: React.FC<{ period: Period }> = ({ period }) => {
  const [series, setSeries] = useState<Array<Series>>([])
  const [fetched, setFetched] = useState(false)

  const { isLoading } = useQuery(
    [`series-${period}`, period],
    (context) => {
      const [start, end] = getPeriod(context.queryKey[1] as Period)
      const [periodStart, periodEnd] = [start.toISOString(), end.toISOString()]

      return getSeries({ gte: periodStart, lte: periodEnd })
    },
    {
      refetchInterval: 5000,
      onSuccess: (data) => {
        setSeries(data)
        setFetched(true)
      }
    }
  )
  if (!fetched && isLoading) {
    return <Loader />
  }

  const min = Math.min(...series.map((s) => s.balance)) * 0.95
  const max = Math.max(...series.map((s) => s.balance)) * 1.05

  const config: G2plotProps = {
    data: series,
    yField: 'balance',
    xField: 'date',
    line: {
      size: 1.5,
      color: 'rgba(29, 165, 122, 0.7)'
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
    autoFit: true,
    animation: false,
    areaStyle: function areaStyle() {
      return { fill: 'rgba(29, 165, 122, 0.4)' }
    }
  }

  return <Area {...config} />
}

export default memo(AreaChart, isEqual)
