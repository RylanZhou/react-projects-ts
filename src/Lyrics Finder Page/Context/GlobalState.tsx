import * as React from 'react'

import { GlobalStateIF, ACTION_TYPES } from './types'
import reducer from './reducer'
import * as api from '../api'

const initialState: GlobalStateIF = {
  tracks: [],
  heading: ''
}

export const GlobalContext = React.createContext<GlobalStateIF | any>(
  initialState
)

export const GlobalProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const getTop10Tracks = async (): Promise<void> => {
    try {
      const {
        data: { message }
      } = await api.getTop10Tracks()
      dispatch({
        type: ACTION_TYPES.SET_TOP_TRACKS,
        payload: {
          tracks: message.body['track_list'],
          heading: 'Top 10 Tracks'
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const searchTrackByTitle = async (title: string): Promise<void> => {
    try {
      dispatch({
        type: ACTION_TYPES.SET_HEADING,
        payload: {
          heading: 'Searching...'
        }
      })
      const {
        data: { message }
      } = await api.searchTrackByTitle(title)
      dispatch({
        type: ACTION_TYPES.SET_TOP_TRACKS,
        payload: {
          tracks: message.body['track_list'],
          heading: 'Search Result'
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <GlobalContext.Provider
      value={{ state, getTop10Tracks, searchTrackByTitle }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
