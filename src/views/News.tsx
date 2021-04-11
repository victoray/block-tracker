import React, { FC, useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'

import { getAssets, getNews } from '../api'
import { StyledBaseContainer } from '../components/styles'

const News: FC = () => {
  const { isLoading, data } = useQuery('assets', getAssets)
  const mutation = useMutation(getNews)

  useEffect(() => {
    if (data) {
      mutation.mutate(data.map((asset) => asset.id))
    }
  }, [])

  return (
    <StyledBaseContainer direction="vertical">
      <div></div>
    </StyledBaseContainer>
  )
}

export default News
