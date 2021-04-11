import { Coin } from '../type'

export type Balance = {
  amount: number
  change: number
}
export type Asset = {
  id: string
  name: string
  price: string
  amount: number
  assetId: string
  coin: Coin
  pnl?: number
  pnlPercent?: number
  currentValue?: number
  originalValue?: number
}

export enum TransactionType {
  ADD = 0,
  REMOVE = 1
}

export type Transaction = {
  id: string
  type: TransactionType
  date: string
  price: number
  amount: number
  assetId: string
  coin: Coin
  pnl?: number
  pnlPercent?: number
}

export type Series = {
  date: string
  id: string
  userId: string
  balance: number
}

export type AppSettings = {
  allowNotifications: boolean
  email?: string
}

export type CryptoNews = {
  news_url: string
  image_url: string
  title: string
  text: string
  source_name: string
  date: string
  topics: Array<string>
  sentiment: string
  type: string
  tickers: Array<string>
}
