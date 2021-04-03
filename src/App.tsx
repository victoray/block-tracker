import React from 'react'
import './App.less'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Routes } from './constants/Routes'
import Assets from './views/Assets'
import AddAsset from './views/AddAsset'
import Asset from './views/Asset'
import styled from 'styled-components/macro'

const StyledHeader = styled.div`
  height: 96px;
  border-bottom: 1px solid #bfbfbf;
`

function App() {
  return (
    <Router>
      <StyledHeader>Block Tracker</StyledHeader>
      <Switch>
        <Route path={Routes.assets} component={Assets} />
        <Route path={Routes.addAsset} component={AddAsset} />
        <Route path={Routes.asset} component={Asset} />
        <Route path={Routes.settings} component={Asset} />
        <Route component={Assets} />
      </Switch>
    </Router>
  )
}

export default App
