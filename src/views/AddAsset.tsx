import { SearchOutlined } from '@ant-design/icons'
import { Input, List } from 'antd'
import { sortBy } from 'lodash'
import React, { FC, useContext, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components/macro'

import AppContext from '../AppContext'
import { getCoinList } from '../api'
import Loader from '../components/Loader'
import { StyledBaseContainer } from '../components/styles'
import { Coin } from '../type'

const StyledInput = styled(Input)`
  border-radius: 16px;
`

const StyledList = styled(List)`
  border-radius: 16px;
`

const StyledImage = styled.img`
  height: 24px;
  width: 24px;
  margin-right: 10px;
`

const AddAsset: FC = () => {
  const { setCurrentCoin } = useContext(AppContext)
  const { data: coinList } = useQuery('coinList', getCoinList)
  const [value, setValue] = useState('')

  if (!coinList) {
    return <Loader />
  }

  const { BaseImageUrl, Data } = coinList

  const filteredData = sortBy(Object.values(Data as Record<string, any>) as Array<Coin>, 'FullName').filter((coin) =>
    [
      coin.FullName.toLowerCase(),
      coin.Name.toLowerCase(),
      coin.Symbol.toLowerCase(),
      coin.CoinName.toLowerCase()
    ].some((v) => v.startsWith(value.toLowerCase()))
  )

  return (
    <StyledBaseContainer size={32} direction="vertical">
      <StyledInput
        placeholder="Search"
        prefix={<SearchOutlined />}
        size="large"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {/*// @ts-ignore*/}
      <StyledList<Coin>
        pagination={{ defaultPageSize: 15 }}
        bordered
        dataSource={filteredData}
        renderItem={(item) => (
          <List.Item key={item.Id} onClick={() => setCurrentCoin(item)}>
            <StyledImage src={`${BaseImageUrl}${item.ImageUrl}`} alt="" />
            {item.CoinName}
          </List.Item>
        )}
      />
    </StyledBaseContainer>
  )
}

export default AddAsset
