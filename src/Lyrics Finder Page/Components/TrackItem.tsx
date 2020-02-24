import * as React from 'react'
import { Link } from 'react-router-dom'

import { Card, CardHeader, Button, CardActions } from '@material-ui/core'
import { IoIosAlbums } from 'react-icons/io'
import { GiMicrophone } from 'react-icons/gi'
import { TiDocumentText } from 'react-icons/ti'

import { TrackIF } from '../Context/types'

export default function TrackItem({ track }: TrackIF): JSX.Element {
  return (
    <Card className="track-item">
      <CardHeader
        className="card-header"
        title={track.track_name}
        subheader={
          <div>
            <span>
              <IoIosAlbums className="icon" />
              {track.album_name}
            </span>
            <br />
            <span>
              <GiMicrophone className="icon" />
              {track.artist_name}
            </span>
          </div>
        }
      />
      <CardActions>
        <Link to={`lyrics/track/${track.track_id}`}>
          <Button
            className="view-button"
            variant="contained"
            color="primary"
            endIcon={<TiDocumentText />}
          >
            View Lyrics
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}
