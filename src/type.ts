import { Transaction } from './api/types'

export type AppProps = {
  modalOpen: boolean
  toggleModal(): void

  currentCoin?: Coin
  setCurrentCoin?(coin: Coin, callbackFn?: () => void): void
  editTransaction?(transaction: Transaction, callbackFn?: () => void): void
}

export type Coin = {
  Id: string
  Url: string
  ImageUrl: string
  Name: string
  Symbol: string
  CoinName: string
  FullName: string
}
