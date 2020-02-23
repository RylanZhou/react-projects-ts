import * as React from 'react'

import { Paper } from '@material-ui/core'

import { EpisodeIF } from '../types'
import { GlobalContext } from '../GlobalState'

import EpisodeItem from './EpisodeItem'

export default function EpisodeList(): JSX.Element {
  const { state, fetchDataAction } = React.useContext(GlobalContext)

  React.useEffect(() => {
    !state.episodes.length && fetchDataAction()
  })

  return (
    <Paper className="episode-list">
      {state.episodes.map((episode: EpisodeIF) => (
        <EpisodeItem episode={episode} key={episode.id} />
      ))}
    </Paper>
  )
}
