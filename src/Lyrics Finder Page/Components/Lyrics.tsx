import * as React from 'react'

import { Link } from 'react-router-dom'

import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  IconButton,
  Collapse
} from '@material-ui/core'
import { AiOutlineLoading3Quarters, AiOutlineRollback } from 'react-icons/ai'
import { IoIosArrowUp } from 'react-icons/io'

import { TrackDetailIF } from '../Context/types'
import * as api from '../api'

interface LyricsPropIF {
  match: any
}

export default function Lyrics({ match }: LyricsPropIF): JSX.Element {
  const [track, setTrack] = React.useState<TrackDetailIF | undefined>(undefined)
  const [lyrics, setLyrics] = React.useState<string>('')
  const [expanded, setExpanded] = React.useState<boolean>(false)

  const getLyrics = async (): Promise<void> => {
    try {
      const response1 = await api.getLyricsByTrackId(match.params.id)
      setLyrics(response1.data.message.body.lyrics['lyrics_body'])
      setExpanded(!!lyrics)
      const response2 = await api.getTrackDetailByTrackId(match.params.id)
      setTrack(response2.data.message.body.track)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    !track && getLyrics()
  })

  return (
    <div className="lyrics-page">
      {!track || !lyrics ? (
        <AiOutlineLoading3Quarters className="loading" />
      ) : (
        <Card className="lyrics">
          <CardHeader
            title={track.track_name}
            subheader={
              <div>
                <span>
                  <strong>Album: </strong>
                  {track.album_name}
                </span>
                <br />
                <span>
                  <strong>Artist: </strong>
                  {track.artist_name}
                </span>
                <br />
                <span>
                  <strong>Song Genre: </strong>
                  {
                    track.primary_genres.music_genre_list[0].music_genre
                      .music_genre_name
                  }
                </span>
                <br />
                <span>
                  <strong>Explicit Words: </strong>
                  {!track.explicit ? 'No' : 'Yes'}
                </span>
                <br />
                <span>
                  <strong>Updated Date: </strong>
                  {new Date(track.updated_time).toDateString()}
                </span>
              </div>
            }
          />
          <CardActions disableSpacing>
            <Link to={`lyrics/track/${track.track_id}`}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<AiOutlineRollback />}
              >
                Go Back
              </Button>
            </Link>
            <IconButton
              className="expand-button"
              onClick={() => setExpanded(!expanded)}
              style={{
                animation: expanded
                  ? 'rotate-reverse .2s linear forwards'
                  : 'rotate .2s linear forwards'
              }}
            >
              <IoIosArrowUp />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {lyrics.split('\n').map((line: string, index: number) => (
                <p key={index}>{line}</p>
              ))}
            </CardContent>
          </Collapse>
        </Card>
      )}
    </div>
  )
}
