import React from 'react'
import './App.less'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components/macro'

import { Routes } from './constants/Routes'
import AddAsset from './views/AddAsset'
import Asset from './views/Asset'
import Assets from './views/Assets'

const StyledHeader = styled.div`
  height: 96px;
  border-bottom: 1px solid #bfbfbf;
`

function App() {
  return (
    <Router>
      <StyledHeader>Block Tracker</StyledHeader>
      <Switch>
        <Route path={Routes.Assets} component={Assets} />
        <Route path={Routes.AddAsset} component={AddAsset} />
        <Route path={Routes.Asset} component={Asset} />
        <Route path={Routes.Settings} component={Asset} />
        <Route component={Assets} />
      </Switch>
    </Router>
  )
}

export default App
