import { Button, Card, Radio, Space, Statistic, Table, Tag, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components/macro'
import { ColumnsType } from 'antd/lib/table'
import AreaChart from '../components/AreaChart'
import { Link } from 'react-router-dom'
import { toAssetRoute } from '../constants/Routes'
import { MoreOutlined, PlusOutlined } from '@ant-design/icons'
import { StyledCard, StyledTable } from '../components/styles'
import Balance from '../components/Balance'

const StyledContainer = styled(Space)`
  padding: 30px 200px;
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

const StyledChartContainer = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid #333333;
  border-radius: 16px;
`

const StyledChartWrapper = styled.div`
  height: 350px;
`

const StyledRadioGroup = styled(Radio.Group)`
  float: right;
  margin-right: 40px;
`

const columns: ColumnsType<{}> = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (name: string) => <Link to={toAssetRoute(name.toLowerCase())}>{name}</Link>
  },
  { title: 'Price', dataIndex: 'price' },
  { title: 'Amount', dataIndex: 'amount' },
  {
    title: '',
    width: 100,
    render: (_, record) => (
      <Space>
        <Button icon={<PlusOutlined />} type={'link'} />
        <Button icon={<MoreOutlined />} type={'link'} />
      </Space>
    )
  }
]

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

      <Balance change={-24} value={300000} />

      <StyledChartContainer>
        <StyledChartWrapper>
          <AreaChart />
        </StyledChartWrapper>

        <StyledRadioGroup defaultValue="1h" buttonStyle="solid">
          <Radio.Button value="1h">1H</Radio.Button>
          <Radio.Button value="12h">12H</Radio.Button>
          <Radio.Button value="1d">1D</Radio.Button>
          <Radio.Button value="1w">1W</Radio.Button>
          <Radio.Button value="1m">1M</Radio.Button>
        </StyledRadioGroup>
      </StyledChartContainer>

      <div>
        <Typography.Title level={3}>My assets</Typography.Title>

        <StyledTable
          columns={columns}
          dataSource={[
            { name: 'Bitcoin', price: '58000', amount: 5.9 },
            { name: 'Ethereum', price: '58000', amount: 5.9 },
            { name: 'Ethereum', price: '58000', amount: 5.9 },
            { name: 'Ethereum', price: '58000', amount: 5.9 },
            { name: 'Ethereum', price: '58000', amount: 5.9 },
            { name: 'Ethereum', price: '58000', amount: 5.9 },
            { name: 'Ethereum', price: '58000', amount: 5.9 },
            { name: 'Ethereum', price: '58000', amount: 5.9 },
            { name: 'Ethereum', price: '58000', amount: 5.9 },
            { name: 'Ethereum', price: '58000', amount: 5.9 },
            { name: 'Ethereum', price: '58000', amount: 5.9 },
            { name: 'Ethereum', price: '58000', amount: 5.9 },
            { name: 'Ethereum', price: '58000', amount: 5.9 },
            { name: 'Ethereum', price: '58000', amount: 5.9 }
          ]}
          pagination={false}
        />
      </div>
    </StyledContainer>
  )
}

export default Assets
