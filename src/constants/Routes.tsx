export enum Routes {
  Assets = '/assets',
  AddAsset = '/add-asset',
  Asset = '/assets/:asset',
  Settings = '/settings'
}

export const toAssetRoute = (name: string) => `/assets/${name}`
