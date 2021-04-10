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
import { useQuery } from 'react-query'
import { getAssets, getTransaction } from '../api'
import { TransactionType } from '../api/types'
import moment from 'moment'

const getTypeValue = (type: TransactionType) => {
  switch (type) {
    case TransactionType.ADD:
      return 'Add'
    case TransactionType.REMOVE:
      return 'Remove'
  }
}
const columns: ColumnsType<{}> = [
  {
    title: 'Type',
    dataIndex: 'type',
    render: getTypeValue
  },
  { title: 'Price', dataIndex: 'price' },
  { title: 'Amount', dataIndex: 'amount' },
  { title: 'Fees', dataIndex: 'fees' },
  { title: 'Date', dataIndex: 'date', render: (date) => moment(date).format('DD-MM-YYYY') },
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
  const { isLoading, data } = useQuery(`transaction-${match.params.asset}`, () => getTransaction(match.params.asset))

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

        <StyledTable loading={isLoading} columns={columns} dataSource={data as any} pagination={false} />
      </div>
    </StyledBaseContainer>
  )
}

export default Asset
