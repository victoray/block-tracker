import { Button, DatePicker, Form, InputNumber, Modal, Select, Typography } from 'antd'
import moment from 'moment'
import React, { FC, useCallback, useState } from 'react'
import './App.less'
import { unstable_batchedUpdates } from 'react-dom'
import { useMutation } from 'react-query'
import { BrowserRouter as Router, Link, Route, Switch, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import { createTransaction, updateTransaction } from './api'
import { Transaction } from './api/types'
import { Routes } from './constants/Routes'
import { Coin } from './type'
import AddAsset from './views/AddAsset'
import Asset from './views/Asset'
import Assets from './views/Assets'
import Settings from './views/Settings'

import AppContext from 'AppContext'

const StyledHeader = styled.div`
  height: 64px;
  border-bottom: 1px solid #303030;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 24px;
  padding: 30px;
`

const StyledButton = styled(Button)`
  border-radius: 16px;
  margin-left: auto;
`

const Header: FC = () => {
  const history = useHistory()

  return (
    <StyledHeader>
      <Link to={Routes.Assets}>Block Tracker</Link>

      <StyledButton type="primary" onClick={() => history.push(Routes.Settings)}>
        Settings
      </StyledButton>
    </StyledHeader>
  )
}

const StyledInput = styled.div`
  width: 100%;
`

const TModal: FC<{ modalOpen: boolean; toggleModal(): void; coin?: Coin; transaction?: Transaction }> = ({
  modalOpen,
  toggleModal,
  coin,
  transaction
}) => {
  const currentCoin = transaction?.coin || coin
  const createTransactionMutation = useMutation(createTransaction, {
    onSuccess: toggleModal
  })
  const editTransaction = useMutation(
    (data: Partial<Transaction>) => updateTransaction(String(transaction?.id), data),
    {
      onSuccess: toggleModal
    }
  )

  const onFinish = (values: Record<string, any>): void => {
    const data = { ...values, assetId: String(currentCoin?.Symbol) }
    if (transaction) {
      editTransaction.mutate(data)
    } else {
      createTransactionMutation.mutate(data as any)
    }
  }

  const getInitialValue = () => {
    if (transaction) {
      return {
        ...transaction,
        date: moment(transaction.date)
      }
    }

    return {
      fee: 0,
      type: 0,
      date: moment()
    }
  }

  return (
    <Modal visible={modalOpen && Boolean(currentCoin)} onCancel={toggleModal} footer={null} destroyOnClose>
      <Typography.Title level={3}>
        {transaction ? 'Edit' : 'Add'} {currentCoin?.FullName} Transaction
      </Typography.Title>

      <Form layout="vertical" initialValues={getInitialValue()} onFinish={onFinish}>
        <Form.Item name="type" label="Transaction Type">
          <Select>
            <Select.Option value={0}>Add</Select.Option>
            <Select.Option value={1}>Remove</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="amount" label="Quantity">
          <StyledInput as={InputNumber} min={0} required />
        </Form.Item>

        <Form.Item name="price" label="Price Per Coin">
          <StyledInput as={InputNumber} min={0} required />
        </Form.Item>

        <Form.Item name="date" label="Date">
          <StyledInput as={DatePicker} />
        </Form.Item>

        <Button
          block
          type="primary"
          size="large"
          htmlType="submit"
          loading={createTransactionMutation.isLoading || editTransaction.isLoading}
        >
          {transaction ? 'Edit' : 'Add'} Transaction
        </Button>
      </Form>
    </Modal>
  )
}

const App: FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [coin, setCoin] = useState<Coin>()
  const [transaction, setTransaction] = useState<Transaction>()
  const [callback, setCallback] = useState<() => void>()

  const toggleModal = useCallback(() => {
    setModalOpen((state) => !state)
    callback?.()
  }, [callback])

  const handleSelectCoin = useCallback((coin_: Coin, callbackFn: () => void) => {
    unstable_batchedUpdates(() => {
      setCoin(coin_)
      setModalOpen(true)
      setCallback(() => callbackFn)
    })
  }, [])

  const handleEditTransaction = useCallback((transaction_: Transaction, callbackFn: () => void) => {
    unstable_batchedUpdates(() => {
      setTransaction(transaction_)
      setModalOpen(true)
      setCallback(() => callbackFn)
    })
  }, [])

  return (
    <AppContext.Provider
      value={{
        modalOpen,
        toggleModal,
        setCurrentCoin: handleSelectCoin,
        editTransaction: handleEditTransaction
      }}
    >
      <Router>
        <Header />
        <TModal modalOpen={modalOpen} toggleModal={toggleModal} coin={coin} transaction={transaction} />
        <Switch>
          <Route path={Routes.Assets} exact component={Assets} />
          <Route path={Routes.AddAsset} exact component={AddAsset} />
          <Route path={Routes.Asset} exact component={Asset} />
          <Route path={Routes.Settings} exact component={Settings} />
          <Route component={Assets} />
        </Switch>
      </Router>
    </AppContext.Provider>
  )
}

export default App
