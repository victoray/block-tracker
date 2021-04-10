import { Skeleton, Statistic, Tag } from 'antd'
import React, { FC } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components/macro'

import { getBalance } from '../api'

import { StyledCard } from './styles'

const StyledTag = styled(Tag)`
  margin-left: auto;
`

const Balance: FC<{ value: number; change: number }> = () => {
  const { isLoading, data } = useQuery('getBalance', () => getBalance())

  return (
    <StyledCard>
      <Skeleton loading={isLoading}>
        <Statistic title="Current Balance (USD)" value={data?.amount} precision={2} />
        <StyledTag color="#cd201f">{data?.change}%</StyledTag>
      </Skeleton>
    </StyledCard>
  )
}

export default Balance
