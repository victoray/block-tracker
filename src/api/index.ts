import axios from 'axios'

import { Asset, Balance, Transaction } from './types'

const BASE_URL = 'http://127.0.0.1:8000'
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

api.interceptors.response.use((response) => response.data)

export const getBalance = (): Promise<Balance> => {
  return api.get('/balance/')
}

export const getAsset = (assetId: string): Promise<Asset> => {
  return api.get(`/assets/${assetId}/`)
}

export const getTransaction = (assetId: string): Promise<Asset> => {
  return api.get(`/transactions/`, { params: { asset_id: assetId } })
}

export const getAssets = (): Promise<Array<Asset>> => {
  return api.get('/assets/')
}
export const deleteAsset = (assetId: string): Promise<void> => {
  return api.delete(`/assets/${assetId}/`)
}

export const getCoinList = (): Promise<Record<string, unknown>> => {
  return api.get('/coin-list/')
}

export const createTransaction = (transaction: Transaction): Promise<any> => {
  return api.post('/transactions/', transaction)
}
