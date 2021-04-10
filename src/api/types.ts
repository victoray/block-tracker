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
}

export enum TransactionType {
  ADD = 0,
  REMOVE = 1
}

export type Transaction = {
  type: TransactionType
  date: string
  price: number
  amount: number
  assetId: string
}
