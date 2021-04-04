import React, { FC } from 'react'
import { Button, Card, Space, Statistic, Typography } from 'antd'
import styled from 'styled-components/macro'
import { Link, RouteComponentProps } from 'react-router-dom'
import { capitalize } from 'lodash'
import { toAssetRoute } from '../constants/Routes'
import {
  DeleteColumnOutlined,
  DeleteFilled,
  EditFilled,
  EditOutlined,
  MoreOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table'
import { StyledBaseContainer, StyledCard, StyledTable } from '../components/styles'
import Balance from '../components/Balance'

const columns: ColumnsType<{}> = [
  {
    title: 'Type',
    dataIndex: 'type'
  },
  { title: 'Price', dataIndex: 'price' },
  { title: 'Amount', dataIndex: 'amount' },
  { title: 'Fees', dataIndex: 'fees' },
  { title: 'Date', dataIndex: 'date' },
  {
    title: '',
    width: 100,
    render: (_, record) => (
      <Space>
        <Button icon={<EditFilled />} type={'link'} />
        <Button icon={<DeleteFilled />} type={'link'} />
      </Space>
    )
  }
]

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledButton = styled(Button)`
  margin-left: auto;
  border-radius: 16px;
`

type MatchParams = {
  asset: string
}

type Props = RouteComponentProps<MatchParams>

const Asset: FC<Props> = ({ match }) => {
  return (
    <StyledBaseContainer direction={'vertical'} size={32}>
      <StyledTitleContainer>
        <Space direction={'vertical'}>
          <Typography.Title level={3}>Your Portfolio</Typography.Title>
          <Typography.Text type={'secondary'}>Accurately tracking your crypto investments</Typography.Text>
        </Space>

        <StyledButton type="primary">Add Transaction</StyledButton>
      </StyledTitleContainer>

      <Balance change={-24} value={300000} />

      <div>
        <Typography.Title level={3}>{capitalize(match.params.asset)} Transactions</Typography.Title>

        <StyledTable
          columns={columns}
          dataSource={[
            { type: 'Add', price: '58000', amount: 5.9 },
            { type: 'Remove', price: '58000', amount: 5.9 },
            { type: 'Remove', price: '58000', amount: 5.9 },
            { type: 'Add', price: '58000', amount: 5.9 },
            { type: 'Remove', price: '58000', amount: 5.9 },
            { type: 'Remove', price: '58000', amount: 5.9 }
          ]}
          pagination={false}
        />
      </div>
    </StyledBaseContainer>
  )
}

export default Asset
