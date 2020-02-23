export interface EpisodeIF {
  id: number
  name: string
  season: number
  number: number
  summary: string
  image: { original: string; medium: string }
  isFavorite: boolean
  url: string
}

export interface GlobalStateIF {
  episodes: EpisodeIF[]
  favorites: EpisodeIF[]
}

export interface ActionIF {
  type: string
  payload: any
}

export enum ACTION_TYPES {
  FETCH_DATA = 'FETCH_DATA',
  SET_FAVORITE = 'SET_FAVORITE'
}
