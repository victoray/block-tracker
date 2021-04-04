import axios from 'axios'
import { Asset, Balance } from './types'

const BASE_URL = 'http://127.0.0.1:8000'
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

api.interceptors.response.use((response) => response.data)

export const getBalance = (): Promise<Balance> => {
  return api.get('/balance/')
}

export const getAssets = (): Promise<Asset[]> => {
  return api.get('/assets/')
}

export const getCoinList = (): Promise<Record<string, unknown>> => {
  return api.get('/coin-list/')
}
