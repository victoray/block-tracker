import axios from 'axios'
import firebase from 'firebase'
import moment from 'moment'

import { FIREBASE_APP } from '../constants/Firebase'

import { Asset, Balance, Series, Transaction } from './types'

const BASE_URL = 'http://127.0.0.1:8000'
const api = axios.create({
  baseURL: BASE_URL
})

api.interceptors.response.use((response) => response.data)
api.interceptors.request.use(async (request) => {
  const app = firebase.app(FIREBASE_APP)
  const token = await firebase.auth(app).currentUser?.getIdToken()
  request.headers.Authorization = `Bearer ${token || ''}`

  return request
})

export const getBalance = (assetId?: string): Promise<Balance> => {
  return api.get('/balance/', { params: { assetId } })
}

export const getAsset = (assetId: string): Promise<Asset> => {
  return api.get(`/assets/${assetId}/`)
}

export const updateTransaction = (transactionId: string, transaction: Partial<Transaction>): Promise<void> => {
  return api.put(`/transactions/${transactionId}/`, transaction)
}

export const deleteTransaction = (transactionId: string): Promise<void> => {
  return api.delete(`/transactions/${transactionId}/`)
}

export const getTransactions = (assetId: string): Promise<Array<Transaction>> => {
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

export const getSeries = (): Promise<Array<Series>> => {
  return api.get('/series/').then((series) => {
    return ((series as unknown) as Array<Series>).map((data) => ({
      ...data,
      date: moment(data.date).format('DD-MM-YYYY HH:mm')
    }))
  })
}
