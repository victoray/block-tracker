import React, { FC } from 'react'
import { Statistic, Tag } from 'antd'
import { StyledCard } from './styles'
import styled from 'styled-components/macro'

const StyledTag = styled(Tag)`
  margin-left: auto;
`

const Balance: FC<{ value: number; change: number }> = ({ value, change }) => {
  return (
    <StyledCard>
      <Statistic title="Current Balance (USD)" value={value} precision={2} />
      <StyledTag color="#cd201f">{change}%</StyledTag>
    </StyledCard>
  )
}

export default Balance
