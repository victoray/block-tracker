import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { Button, notification, Popconfirm, Space, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { capitalize } from 'lodash'
import moment from 'moment'
import React, { FC, useContext } from 'react'
import { useMutation, useQuery } from 'react-query'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import AppContext from '../AppContext'
import { deleteTransaction, getTransactions } from '../api'
import { Transaction, TransactionType } from '../api/types'
import Balance from '../components/Balance'
import { StyledBaseContainer, StyledTable } from '../components/styles'
import { Routes } from '../constants/Routes'
import { formatAmount } from '../utils'

const getTypeValue = (type: TransactionType): string => {
  switch (type) {
    case TransactionType.ADD:
      return 'Add'
    case TransactionType.REMOVE:
      return 'Remove'
    default:
      return '-'
  }
}

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
  const history = useHistory()
  const { editTransaction, setCurrentCoin } = useContext(AppContext)

  const { isLoading, data, refetch } = useQuery(
    `transactions-${match.params.asset}`,
    () => getTransactions(match.params.asset),
    {
      refetchInterval: 5000,
      onSuccess: (transactions) => {
        if (!transactions.length) {
          history.push(Routes.Assets)
        }
      }
    }
  )

  const removeTransaction = useMutation(deleteTransaction, {
    onSuccess: () => {
      notification.success({
        message: 'Transaction Removed'
      })
      refetch()
    }
  })

  const columns: ColumnsType<Transaction> = [
    {
      title: 'Type',
      dataIndex: 'type',
      render: getTypeValue
    },
    { title: 'Price', dataIndex: 'price', render: formatAmount },
    { title: 'Amount', dataIndex: 'amount' },
    {
      title: 'Total',
      dataIndex: 'amount',
      render: (amount, transaction) => (
        <Space direction="vertical">
          <Typography.Text strong>
            {!isNaN(Number(transaction.price)) ? `${formatAmount(Number(transaction.price) * amount)}` : '-'}
          </Typography.Text>
          <Typography.Text type="secondary">
            {amount} {transaction.assetId}
          </Typography.Text>
        </Space>
      )
    },
    {
      title: 'Profit/Loss',
      dataIndex: 'pnl',
      render: (pnl, transaction) => (
        <Space direction="vertical">
          <Typography.Text strong>{formatAmount(pnl)}</Typography.Text>
          {transaction.pnlPercent && (
            <Typography.Text type={transaction.pnlPercent > 0 ? 'success' : 'danger'}>
              {transaction.pnlPercent.toFixed(2)} %
            </Typography.Text>
          )}
        </Space>
      )
    },
    { title: 'Date', dataIndex: 'date', render: (date) => moment(date).format('DD-MM-YYYY') },
    {
      title: '',
      width: 100,
      render: (_, transaction) => (
        <Space>
          <Button icon={<EditFilled />} type="link" onClick={() => editTransaction?.(transaction, refetch)} />
          <Popconfirm
            title="Are you sure to delete this asset?"
            onConfirm={() => removeTransaction.mutate(transaction.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteFilled />} type="link" />
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <StyledBaseContainer direction="vertical" size={32}>
      <StyledTitleContainer>
        <Space direction="vertical">
          <Typography.Title level={3}>My Portfolio</Typography.Title>
          <Typography.Text type="secondary">Accurately tracking your crypto investments</Typography.Text>
        </Space>

        <StyledButton type="primary" onClick={() => data && setCurrentCoin?.(data[0].coin, refetch)}>
          Add Transaction
        </StyledButton>
      </StyledTitleContainer>

      <Balance assetId={match.params.asset} />

      <div>
        <Typography.Title level={3}>{capitalize(match.params.asset)} Transactions</Typography.Title>

        <StyledTable loading={isLoading} columns={columns as any} dataSource={data} pagination={false} />
      </div>
    </StyledBaseContainer>
  )
}

export default Asset
