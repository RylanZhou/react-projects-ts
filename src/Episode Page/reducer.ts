import { GlobalStateIF, ActionIF, ACTION_TYPES, EpisodeIF } from './types'

export default (state: GlobalStateIF, action: ActionIF): GlobalStateIF => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_DATA:
      return {
        ...state,
        episodes: action.payload.map((each: EpisodeIF) => ({
          ...each,
          isFavorite: false
        }))
      }
    case ACTION_TYPES.SET_FAVORITE:
      const episodes: EpisodeIF[] = [...state.episodes]
      const target: EpisodeIF | undefined = episodes.find(
        (each: EpisodeIF) => each.id === action.payload
      )
      if (target) {
        target.isFavorite = !target.isFavorite
      }

      return {
        ...state,
        favorites: [
          ...state.episodes.filter((episode: EpisodeIF) => episode.isFavorite)
        ],
        episodes
      }
    default:
      return state
  }
}
