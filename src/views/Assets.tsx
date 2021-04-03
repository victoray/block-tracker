import React from 'react'
import styled from 'styled-components/macro'
import { Button } from 'antd'

const StyledContainer = styled.div`
  display: flex;
`
const Assets = () => {
  return (
    <StyledContainer>
      <Button type={'primary'}>Add Asset</Button>
    </StyledContainer>
  )
}

export default Assets
