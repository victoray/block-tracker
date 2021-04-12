import { Skeleton, Statistic, Tag } from 'antd'
import React, { FC } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components/macro'

import { getBalance } from '../api'

import { StyledCard } from './styles'

const StyledTag = styled(Tag)`
  margin-left: auto;
`

const Balance: FC<{ assetId?: string }> = ({ assetId }) => {
  const { isLoading, data } = useQuery('getBalance', () => getBalance(assetId), {
    refetchInterval: 1000,
    cacheTime: 0
  })

  return (
    <StyledCard>
      <Skeleton loading={isLoading} paragraph={{ rows: 1 }}>
        <Statistic title="Current Balance (USD)" value={data?.amount} precision={2} />
        {data?.change !== undefined && (
          <StyledTag color={data.change > 0 ? 'success' : '#cd201f'}>{data.change.toFixed(2)}%</StyledTag>
        )}
      </Skeleton>
    </StyledCard>
  )
}

export default Balance
