import React from 'react'
import './App.less'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import { Routes } from './constants/Routes'
import AddAsset from './views/AddAsset'
import Asset from './views/Asset'
import Assets from './views/Assets'
import Settings from './views/Settings'
import { Button } from 'antd'

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

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={Routes.Assets} exact component={Assets} />
        <Route path={Routes.AddAsset} exact component={AddAsset} />
        <Route path={Routes.Asset} exact component={Asset} />
        <Route path={Routes.Settings} exact component={Settings} />
        <Route component={Assets} />
      </Switch>
    </Router>
  )
}

export default App
