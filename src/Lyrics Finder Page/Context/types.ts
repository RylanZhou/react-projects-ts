export interface TrackIF {
  track: {
    track_id: number
    track_name: string
    album_name: string
    artist_name: string
  }
}

export interface TrackDetailIF {
  track_name: string
  album_name: string
  track_id: number
  album_id: number
  primary_genres: any
  artist_name: string
  explicit: number
  updated_time: string
}

export interface GlobalStateIF {
  tracks: TrackIF[]
  heading: string
}

export interface ActionIF {
  type: string
  payload: any
}

export enum ACTION_TYPES {
  SET_TOP_TRACKS = 'SET_TOP_TRACKS',
  SET_HEADING = 'SET_HEADING'
}
