import { Button, Space, Statistic, Table, Tag, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components/macro'
import { ColumnsType } from 'antd/lib/table'

const StyledContainer = styled(Space)`
  padding: 30px;
  width: 100%;

  & > * {
    width: 100%;
  }
`

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledButton = styled(Button)`
  margin-left: auto;
`

const StyledBalanceContainer = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`

const StyledTag = styled(Tag)`
  margin-left: auto;
`

const StyledChartContainer = styled.div`
  width: 100%;
  height: 320px;
  background-color: gainsboro;
`

const StyledTable = styled(Table)`
  border: 1px solid #f0f0f0;
`

const columns: ColumnsType<{}> = [{ title: 'Name' }, { title: 'Price' }, { title: 'Amount' }, { title: '' }]

const Assets = () => {
  return (
    <StyledContainer direction={'vertical'} size={24}>
      <StyledTitleContainer>
        <Space direction={'vertical'}>
          <Typography.Title level={3}>My Portfolio</Typography.Title>
          <Typography.Text type={'secondary'}>Accurately tracking your crypto investments</Typography.Text>
        </Space>

        <StyledButton type="primary">Add Asset</StyledButton>
      </StyledTitleContainer>

      <StyledBalanceContainer>
        <Statistic title="Current Balance (USD)" value={112893} precision={2} />
        <StyledTag color="#cd201f">-24%</StyledTag>
      </StyledBalanceContainer>

      <StyledChartContainer></StyledChartContainer>

      <div>
        <Typography.Title level={3}>My assets</Typography.Title>

        <StyledTable columns={columns} />
      </div>
    </StyledContainer>
  )
}

export default Assets
