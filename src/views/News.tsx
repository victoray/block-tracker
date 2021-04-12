import { Avatar, Card } from 'antd'
import React, { FC } from 'react'
import { useMutation, useQuery } from 'react-query'

import { getAssets, getNews } from '../api'
import Loader from '../components/Loader'
import { StyledBaseContainer } from '../components/styles'

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

  return (
    <StyledBaseContainer direction="vertical">
      {mutation.data.map((news, index) => (
        <Card style={{ width: '100%', marginTop: 16 }} key={index}>
          <Meta
            avatar={<Avatar src={news.image_url} />}
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
