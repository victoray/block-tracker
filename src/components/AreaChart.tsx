import { Area } from '@ant-design/charts'
import { AreaOptions as G2plotProps } from '@antv/g2plot'
import React from 'react'

const AreaChart: React.FC = () => {
  const data = [
    {
      year: '1991',
      value: 3
    },
    {
      year: '1992',
      value: 4
    },
    {
      year: '1993',
      value: 3.5
    },
    {
      year: '1994',
      value: 5
    },
    {
      year: '1995',
      value: 4.9
    },
    {
      year: '1996',
      value: 6
    },
    {
      year: '1997',
      value: 7
    },
    {
      year: '1998',
      value: 9
    },
    {
      year: '1999',
      value: 13
    }
  ]

  const config: G2plotProps = {
    data,
    yField: 'value',
    xField: 'year',
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
      tickCount: 5
    },
    areaStyle: function areaStyle() {
      return { fill: 'rgba(29, 165, 122, 0.4)' }
    }
  }

  return <Area {...config} />
}

export default AreaChart