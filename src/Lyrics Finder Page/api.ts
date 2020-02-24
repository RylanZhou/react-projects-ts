import axios from 'axios'

const PROXY = 'https://cors-anywhere.herokuapp.com'
const service = axios.create({
  baseURL: `${PROXY}/https://api.musixmatch.com/ws/1.1/`
})

// For more apis, check https://developer.musixmatch.com/documentation

export const getTop10Tracks = () =>
  service({
    url: 'chart.tracks.get',
    method: 'GET',
    params: {
      chartName: 'top',
      page: 1,
      pageSize: 10,
      country: 'us',
      fHasLyrics: 1,
      apikey: process.env.REACT_APP_MUSIXMATCH_KEY
    }
  })

export const getLyricsByTrackId = (id: number) =>
  service({
    url: 'track.lyrics.get',
    method: 'GET',
    params: {
      'track_id': id,
      apikey: process.env.REACT_APP_MUSIXMATCH_KEY
    }
  })

export const getTrackDetailByTrackId = (id: number) =>
  service({
    url: 'track.get',
    method: 'get',
    params: {
      'track_id': id,
      apikey: process.env.REACT_APP_MUSIXMATCH_KEY
    }
  })

export const searchTrackByTitle = (title: string) =>
  service({
    url: 'track.search',
    method: 'GET',
    params: {
      'q_track': title,
      apikey: process.env.REACT_APP_MUSIXMATCH_KEY
    }
  })
