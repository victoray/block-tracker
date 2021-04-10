import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Radio, Space, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React, { FC, useContext } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import AppContext from '../AppContext'
import { deleteAsset, getAssets } from '../api'
import { Asset } from '../api/types'
import AreaChart from '../components/AreaChart'
import Balance from '../components/Balance'
import { StyledBaseContainer, StyledTable } from '../components/styles'
import { Routes, toAssetRoute } from '../constants/Routes'
import { formatAmount } from '../utils'

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledButton = styled(Button)`
  margin-left: auto;
  border-radius: 16px;
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

const Assets: FC = () => {
  const history = useHistory()
  const { setCurrentCoin } = useContext(AppContext)
  const { isLoading, data, refetch } = useQuery('assets', getAssets)
  const mutation = useMutation(deleteAsset, {
    onSuccess: () => {
      refetch()
    }
  })

  const columns: ColumnsType<Asset> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name: string, record) => <Link to={toAssetRoute(record.id)}>{name}</Link>
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price) => {
        if (!isNaN(price)) {
          return `$${Number(price).toFixed(2)}`
        }

        return '-'
      }
    },
    {
      title: 'Holdings',
      dataIndex: 'amount',
      render: (amount, asset) => (
        <Space direction="vertical">
          <Typography.Text strong>
            {!isNaN(Number(asset.price)) ? `${formatAmount(Number(asset.price) * amount)}` : '-'}
          </Typography.Text>
          <Typography.Text type="secondary">
            {amount} {asset.id}
          </Typography.Text>
        </Space>
      )
    },
    {
      title: 'Profit/Loss',
      dataIndex: 'pnl',
      render: (pnl, asset) => (
        <Space direction="vertical">
          <Typography.Text strong>{formatAmount(pnl)}</Typography.Text>
          {asset.pnlPercent && (
            <Typography.Text type={asset.pnlPercent > 0 ? 'success' : 'danger'}>
              {asset.pnlPercent.toFixed(2)} %
            </Typography.Text>
          )}
        </Space>
      )
    },
    {
      title: '',
      width: 100,
      render: (_, asset) => (
        <Space>
          <Button icon={<PlusOutlined />} type="link" onClick={() => setCurrentCoin?.(asset.coin, refetch)} />
          <Popconfirm
            title="Are you sure to delete this asset?"
            onConfirm={() => mutation.mutate(asset.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="link" />
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <StyledBaseContainer direction="vertical" size={24}>
      <StyledTitleContainer>
        <Space direction="vertical">
          <Typography.Title level={3}>My Portfolio</Typography.Title>
          <Typography.Text type="secondary">Accurately tracking your crypto investments</Typography.Text>
        </Space>

        <StyledButton type="primary" onClick={() => history.push(Routes.AddAsset)} icon={<PlusOutlined />}>
          Add Transaction
        </StyledButton>
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

        <StyledTable columns={columns as any} loading={isLoading} dataSource={data} pagination={false} rowKey="id" />
      </div>
    </StyledBaseContainer>
  )
}

export default Assets
