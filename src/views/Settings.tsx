import React from 'react'
import { StyledBaseContainer } from '../components/styles'
import { Row, Space, Switch, Typography } from 'antd'

const Settings = () => {
  return (
    <StyledBaseContainer direction={'vertical'}>
      <Typography.Title level={3}>Settings</Typography.Title>

      <Row justify={'space-between'} align={'middle'}>
        Allow Notification <Switch defaultChecked />
      </Row>
    </StyledBaseContainer>
  )
}

export default Settings
