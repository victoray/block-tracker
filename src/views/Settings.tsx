import { Button, Form, Input, Switch, Typography } from 'antd'
import React, { FC } from 'react'
import { useMutation, useQuery } from 'react-query'
import styled from 'styled-components/macro'

import { getSettings, updateSettings } from '../api'
import { AppSettings } from '../api/types'
import Loader from '../components/Loader'
import { StyledBaseContainer } from '../components/styles'

const StyledForm = styled(Form)`
  width: 400px;
`
const StyledButton = styled(Button)`
  border-radius: 16px;
`

const Settings: FC = () => {
  const [form] = Form.useForm()

  const updateForm = (data: AppSettings): void => {
    form.setFields([
      { name: 'allowNotifications', value: data.allowNotifications },
      { name: 'email', value: data.email }
    ])
  }

  const { isLoading } = useQuery('settings', getSettings, {
    refetchOnWindowFocus: false,
    onSuccess: updateForm
  })
  const mutation = useMutation(updateSettings, {
    onSuccess: updateForm
  })

  if (isLoading) {
    return <Loader />
  }

  return (
    <StyledBaseContainer direction="vertical">
      <Typography.Title level={3}>Settings</Typography.Title>

      <StyledForm form={form} onFinish={(values) => mutation.mutate(values as Record<string, unknown>)} colon={false}>
        <Form.Item name="allowNotifications" valuePropName="checked" label="Allow Notifications">
          <Switch />
        </Form.Item>
        <Form.Item name="email" label="Email Address">
          <Input type="email" placeholder="Enter email address" />
        </Form.Item>

        <Form.Item>
          <StyledButton type="primary" loading={mutation.isLoading} htmlType="submit">
            Save Settings
          </StyledButton>
        </Form.Item>
      </StyledForm>
    </StyledBaseContainer>
  )
}

export default Settings
