import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, notification, Popconfirm, Radio, Space, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment, { Moment } from 'moment'
import React, { FC, useContext, useState } from 'react'
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

enum Period {
  all = 'all',
  oneHour = '1h',
  twelveHours = '12h',
  oneDay = '1d',
  oneWeek = '1w',
  oneMonth = '1m',
  oneYear = '1y'
}

const getPeriod = (period: Period): [Moment, Moment] => {
  const timeMapping: Record<Period, [Moment, Moment]> = {
    [Period.all]: [moment().subtract(2, 'years'), moment()],
    [Period.oneHour]: [moment().subtract(1, 'hour'), moment()],
    [Period.twelveHours]: [moment().subtract(12, 'hours'), moment()],
    [Period.oneDay]: [moment().subtract(1, 'day'), moment()],
    [Period.oneWeek]: [moment().subtract(1, 'week'), moment()],
    [Period.oneMonth]: [moment().subtract(1, 'month'), moment()],
    [Period.oneYear]: [moment().subtract(1, 'year'), moment()]
  }

  return timeMapping[period]
}

const Assets: FC = () => {
  const history = useHistory()
  const { setCurrentCoin } = useContext(AppContext)
  const [currentPeriod, setCurrentPeriod] = useState<Period>(Period.all)

  const { isLoading, data, refetch } = useQuery('assets', getAssets, {
    refetchInterval: 1000
  })
  const mutation = useMutation(deleteAsset, {
    onSuccess: () => {
      notification.success({
        message: 'Asset has been removed'
      })
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

      <Balance />

      <StyledChartContainer>
        <StyledChartWrapper>
          <AreaChart period={getPeriod(currentPeriod)} />
        </StyledChartWrapper>

        <StyledRadioGroup
          defaultValue={Period.all}
          buttonStyle="solid"
          onChange={(e) => setCurrentPeriod(e.target.value)}
        >
          <Radio.Button value={Period.oneHour}>1H</Radio.Button>
          <Radio.Button value={Period.twelveHours}>12H</Radio.Button>
          <Radio.Button value={Period.oneDay}>1D</Radio.Button>
          <Radio.Button value={Period.oneWeek}>1W</Radio.Button>
          <Radio.Button value={Period.oneMonth}>1M</Radio.Button>
          <Radio.Button value={Period.oneYear}>1Y</Radio.Button>
          <Radio.Button value={Period.all}>All</Radio.Button>
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
