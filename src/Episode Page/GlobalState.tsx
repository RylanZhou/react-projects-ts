import * as React from 'react'

import { GlobalStateIF, ACTION_TYPES } from './types'
import reducer from './reducer'
import { getAllEpisodes } from './api'

const initialState: GlobalStateIF = {
  episodes: [],
  favorites: []
}

export const GlobalContext = React.createContext<GlobalStateIF | any>(
  initialState
)

const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const fetchDataAction = async (): Promise<void> => {
    try {
      const response = await getAllEpisodes()
      dispatch({
        type: ACTION_TYPES.FETCH_DATA,
        payload: response.data._embedded.episodes
      })
    } catch (error) {
      console.log(error)
    }
  }

  const setFavoriteAction = (id: number): void =>
    dispatch({
      type: ACTION_TYPES.SET_FAVORITE,
      payload: id
    })

  return (
    <GlobalContext.Provider
      value={{ state, fetchDataAction, setFavoriteAction }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
