import { Row, Switch, Typography } from 'antd'
import React, { FC } from 'react'

import { StyledBaseContainer } from '../components/styles'

const Settings: FC = () => {
  return (
    <StyledBaseContainer direction="vertical">
      <Typography.Title level={3}>Settings</Typography.Title>

      <Row justify="space-between" align="middle">
        Allow Notification <Switch defaultChecked />
      </Row>
    </StyledBaseContainer>
  )
}

export default Settings
