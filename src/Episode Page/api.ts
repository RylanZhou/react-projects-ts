import axios from 'axios'

const service = axios.create({
  baseURL: 'http://api.tvmaze.com',
  timeout: 5000
})

export const getAllEpisodes = () =>
  service({
    method: 'GET',
    url: '/singlesearch/shows',
    params: {
      q: 'rick-&-morty',
      embed: 'episodes'
    }
  })
