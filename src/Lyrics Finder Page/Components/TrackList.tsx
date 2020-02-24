import * as React from 'react'

import { Paper } from '@material-ui/core'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { GlobalContext } from '../Context/GlobalState'
import { TrackIF } from '../Context/types'
import TrackItem from './TrackItem'
import SearchTrack from './SearchTrack'

export default function TrackList(): JSX.Element {
  const {
    state: { tracks, heading },
    getTop10Tracks
  } = React.useContext(GlobalContext)

  getTop10Tracks()

  return (
    <React.Fragment>
      <SearchTrack />
      <Paper elevation={0} className="track-list">
        <h1>{heading}</h1>
        {!tracks.length ? (
          <AiOutlineLoading3Quarters className="loading" />
        ) : (
          <div className="list-container">
            {tracks.map((each: TrackIF) => (
              <TrackItem track={each.track} key={each.track.track_id} />
            ))}
          </div>
        )}
      </Paper>
    </React.Fragment>
  )
}
