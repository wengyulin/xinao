export interface ConfigState {
  theme: 'light' | 'dark',
  loadingCount: number
}

export enum ConfigActionTypes {
  CONFIG_SET_LOADING_COUNT = '@@config/CONFIG_SET_LOADING_COUNT'
}
