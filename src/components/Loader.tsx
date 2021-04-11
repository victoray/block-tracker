import { Row, Spin } from 'antd'
import React, { FC } from 'react'
import styled from 'styled-components/macro'

const StyledRow = styled(Row)`
  padding: 50px;
`

const Loader: FC = () => {
  return (
    <StyledRow justify="center">
      <Spin size="large" />
    </StyledRow>
  )
}

export default Loader
