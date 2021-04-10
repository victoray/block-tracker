import React, { FC, useCallback, useState } from 'react'
import './App.less'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import { Routes } from './constants/Routes'
import AddAsset from './views/AddAsset'
import Asset from './views/Asset'
import Assets from './views/Assets'
import Settings from './views/Settings'
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, Typography } from 'antd'
import AppContext from 'AppContext'
import { Coin } from './type'
import { unstable_batchedUpdates } from 'react-dom'
import { useMutation } from 'react-query'
import { createTransaction } from './api'
import moment from 'moment'

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

const Header = () => {
  const history = useHistory()
  return (
    <StyledHeader>
      <Link to={Routes.Assets}>Block Tracker</Link>

      <StyledButton type={'primary'} onClick={() => history.push(Routes.Settings)}>
        Settings
      </StyledButton>
    </StyledHeader>
  )
}

const StyledInput = styled.div`
  width: 100%;
`

const TModal: FC<{ modalOpen: boolean; toggleModal: () => void; coin?: Coin }> = ({ modalOpen, toggleModal, coin }) => {
  const mutation = useMutation(createTransaction)

  return (
    <Modal visible={modalOpen && Boolean(coin)} onCancel={toggleModal} footer={null}>
      <Typography.Title level={3}>Add {coin?.FullName} Transaction</Typography.Title>

      <Form
        layout={'vertical'}
        initialValues={{
          type: 0,
          date: moment()
        }}
        onFinish={(values) => mutation.mutate({ ...values, assetId: coin?.Symbol })}
      >
        <Form.Item name={'type'} label={'Transaction Type'}>
          <Select>
            <Select.Option value={0}>Add</Select.Option>
            <Select.Option value={1}>Remove</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name={'amount'} label={'Quantity'}>
          <StyledInput as={InputNumber} min={0} required />
        </Form.Item>

        <Form.Item name={'price'} label={'Price Per Coin'}>
          <StyledInput as={InputNumber} min={0} required />
        </Form.Item>

        <Form.Item name={'fee'} label={'Fee'}>
          <StyledInput as={InputNumber} min={0} required />
        </Form.Item>

        <Form.Item name={'date'} label={'Date'}>
          <StyledInput as={DatePicker} />
        </Form.Item>

        <Button block type={'primary'} size={'large'} htmlType={'submit'}>
          Add Transaction
        </Button>
      </Form>
    </Modal>
  )
}

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [coin, setCoin] = useState<Coin>()

  const toggleModal = useCallback(() => setModalOpen((state) => !state), [])
  const handleSelectCoin = useCallback((coin: Coin) => {
    unstable_batchedUpdates(() => {
      setCoin(coin)
      setModalOpen(true)
    })
  }, [])

  return (
    <AppContext.Provider value={{ modalOpen, toggleModal, setCurrentCoin: handleSelectCoin }}>
      <Router>
        <Header />
        <TModal modalOpen={modalOpen} toggleModal={toggleModal} coin={coin} />
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
