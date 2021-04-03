import React from 'react'
import './App.less'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { Routes } from './constants/Routes'
import AddAsset from './views/AddAsset'
import Asset from './views/Asset'
import Assets from './views/Assets'
import Settings from './views/Settings'

const StyledHeader = styled.div`
  height: 96px;
  border-bottom: 1px solid #303030;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 32px;
  padding: 30px;
`

function App() {
  return (
    <Router>
      <StyledHeader>
        <Link to={Routes.Assets}>Block Tracker</Link>
      </StyledHeader>
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
