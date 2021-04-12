import axios from 'axios'
import firebase from 'firebase'
import moment from 'moment'

import { FIREBASE_APP } from '../constants/Firebase'

import { AppSettings, Asset, Balance, CryptoNews, Series, Transaction } from './types'

const BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000'
const CRYPTO_NEWS_API_KEY = process.env.REACT_APP_CRYPTO_NEWS_API_KEY || 'wvmbedjsa1pucmfct8pkpo8swss0v5n02oniywly'
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

export const getSeries = (params = {}): Promise<Array<Series>> => {
  return api
    .get('/series/', {
      params
    })
    .then((series) => {
      return ((series as unknown) as Array<Series>).map((data) => ({
        ...data,
        balance: Number(data.balance.toFixed(2)),
        date: moment(data.date).format('DD-MM-YYYY HH:mm')
      }))
    })
}

export const getSettings = (): Promise<AppSettings> => {
  return api.get('/settings/')
}

export const updateSettings = (data = {}): Promise<AppSettings> => {
  return api.post('/settings/', data)
}

export const getNews = (assets: Array<string>): Promise<Array<CryptoNews>> => {
  return axios
    .get('https://cryptonews-api.com/api/v1', {
      params: {
        items: 20,
        tickers: assets.join(',') || 'BTC,ETH,BNB',
        token: CRYPTO_NEWS_API_KEY
      }
    })
    .then((r) => r.data?.data)
}
