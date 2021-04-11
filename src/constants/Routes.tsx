export enum Routes {
  Assets = '/assets',
  AddAsset = '/add-asset',
  Asset = '/assets/:asset',
  Settings = '/settings',
  News = '/news'
}

export const toAssetRoute = (name: string) => `/assets/${name}`
