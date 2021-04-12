import { Avatar, Card, Space, Typography } from 'antd'
import React, { FC } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { getAssets, getNews } from '../api'
import Loader from '../components/Loader'
import { StyledBaseContainer } from '../components/styles'
import { Routes } from '../constants/Routes'

const StyledSpace = styled(Space)`
  width: 100%;
  text-align: center;
  padding: 50px;
`
const { Meta } = Card
const News: FC = () => {
  const mutation = useMutation(getNews)
  const { isLoading, data } = useQuery('assets', getAssets, {
    refetchOnWindowFocus: false,
    onSuccess: (data_) => {
      mutation.mutate(data_.map((asset) => asset.id))
    }
  })

  if (!mutation.data || isLoading) {
    return <Loader />
  }

  if (!mutation.data.length) {
    return (
      <StyledSpace direction="vertical">
        <Typography.Title level={3}>You currently have no news</Typography.Title>
        <Typography.Text>
          You can <Link to={Routes.AddAsset}>add more</Link> crypto assets and come back here
        </Typography.Text>
      </StyledSpace>
    )
  }

  return (
    <StyledBaseContainer direction="vertical">
      {mutation.data.map((news, index) => (
        <Card style={{ width: '100%', marginTop: 16 }} key={index}>
          <Meta
            avatar={<Avatar src={news.image_url} shape="square" size={125} />}
            title={
              <a href={news.news_url} target="_blank" rel="noreferrer">
                {news.title}
              </a>
            }
            description={news.text}
          />
        </Card>
      ))}
    </StyledBaseContainer>
  )
}

export default News
